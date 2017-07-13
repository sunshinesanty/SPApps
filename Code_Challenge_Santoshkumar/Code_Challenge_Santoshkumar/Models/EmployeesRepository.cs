using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.ModelBinding;

namespace Code_Challenge_Santoshkumar.Models
{
    public class EmployeesRepository
    {
        #region In Memory Data
        /// <summary>
        /// Initializing a static array of 
        /// </summary>
        public static IList<Employee> EmployeesList = new List<Employee>()
        {
            new Employee() { Id = 1, FirstName = "John", LastName= "Smith", ManagerID = 6 },
            new Employee() { Id = 2, FirstName = "Adam", LastName= "Smith", ManagerID = 6 },
            new Employee() { Id = 3, FirstName = "Elen", LastName= "Adam", ManagerID = 2 },
            new Employee() { Id = 4, FirstName = "Eve", LastName= "Smith", ManagerID = 1 },
            new Employee() { Id = 5, FirstName = "Larry", LastName= "Roth" },
            new Employee() { Id = 6, FirstName = "Nic", LastName= "Lawrence" },
            new Employee() { Id = 7, FirstName = "Santosh", LastName= "Krishnamurthy", ManagerID = 5 }
        };
        #endregion

        #region Member
        public static readonly object CRUDLock = new object(); // to make the Static Employees List, Thread safe during Insert, Update and delete.
        private IEnumerable<Employee> TopLevelEmployees
        {
            get
            {
                return EmployeesRepository.EmployeesList.Where(emp => !emp.ManagerID.HasValue || (emp.ManagerID.HasValue && emp.ManagerID.Value == 0));
            }
        }
        #endregion
        #region Public Methods
        /// <summary>
        /// Get all Employees
        /// </summary>
        /// <returns></returns>
        public IList<Employee> GetEmployees()
        {
            return EmployeesRepository.EmployeesList.OrderBy(emp => emp.Id).ToArray();
        }

        /// <summary>
        /// Get employes arraged in their heirarchy
        /// </summary>
        /// <returns></returns>
        public IList<OrgChartHeirarchy> GetEmployeesByHierarchy()
        {
            return this.TopLevelEmployees.Select(emp => { return new OrgChartHeirarchy() { Manager = emp }; }).ToArray();
        }

        /// <summary>
        /// Get Employees that at the top level (i.e Employee without Mangers)
        /// </summary>
        /// <returns>Returns list of Top level Employees that will form the head of the Org chart</returns>
        public IList<Employee> GetTopLevelEmployees()
        {
            return this.TopLevelEmployees.ToArray();
        }

        /// <summary>
        /// Gets the specific employee details based on the Id provided
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>Details of the employees provided</returns>
        public OrgChartHeirarchy GetEmployeeDetails(int Id)
        {
            return EmployeesRepository.EmployeesList.Where(e => e.Id == Id).Select(emp => { return new OrgChartHeirarchy() { Manager = emp }; }).FirstOrDefault();
        }

        /// <summary>
        /// Adds the new employee details provided to static array, (the data might not be persisted, as it is in memory and once time only)
        /// </summary>
        /// <param name="EmployeeDataToAdd"></param>
        /// <returns>Updated Employee Heirarchy</returns>
        public IList<OrgChartHeirarchy> AddEmployees(Employee EmployeeDataToAdd)
        {
            lock (CRUDLock)
            {
                EmployeeDataToAdd.Id = EmployeesRepository.EmployeesList.OrderBy(emp => emp.Id).Last().Id + 1;
                EmployeesRepository.EmployeesList.Add(EmployeeDataToAdd);
            }
            return this.GetEmployeesByHierarchy();
        }

        /// <summary>
        /// updates the specofoc employee detail provided to static array, (the data might not be persisted, as it is in memory and once time only)
        /// </summary>
        /// <param name="EmployeeDataToUpdate"></param>
        /// <returns>Updated Employee Heirarchy</returns>
        public IList<OrgChartHeirarchy> UpdateEmployee(Employee EmployeeDataToUpdate)
        {
            lock (CRUDLock)
            {
                var EmployeeToUpdate = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == EmployeeDataToUpdate.Id);
                EmployeeToUpdate.FirstName = EmployeeDataToUpdate.FirstName;
                EmployeeToUpdate.LastName = EmployeeDataToUpdate.LastName;
                EmployeeToUpdate.ManagerID = EmployeeDataToUpdate.ManagerID;
            }
            return this.GetEmployeesByHierarchy();
        }

        /// <summary>
        /// Deleted the employee only if no reportees are available or if an aletrnative Manager Id is provided, (the data might not be persisted, as it is in memory and once time only)
        /// </summary>
        /// <param name="EmployeeID"></param>
        /// <param name="NewManagerIDForRepotees"></param>
        /// <returns>Updated Employee Heirarchy</returns>
        public IList<OrgChartHeirarchy> DeleteEmployee(int EmployeeID, int? NewManagerIDForRepotees = null)
        {
            var EmployeeToDelete = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == EmployeeID);
            if (EmployeesRepository.EmployeesList.Any(emp => emp.ManagerID.HasValue && emp.ManagerID.Value == EmployeeToDelete.Id))
            {
                if (NewManagerIDForRepotees.HasValue)
                {

                    lock (CRUDLock)
                    {
                        EmployeesRepository.EmployeesList
                        .Where(emp => emp.ManagerID.HasValue && emp.ManagerID.Value == EmployeeToDelete.Id)
                        .Select(emp =>
                        {
                            emp.ManagerID = NewManagerIDForRepotees;
                            return emp;
                        }).ToList();
                    }
                }
                else
                    throw new InvalidOperationException(Properties.Settings.Default.EmployeesReportingErrorMsg);
            }
            lock (CRUDLock)
            {
                EmployeesRepository.EmployeesList.Remove(EmployeeToDelete);
            }
            return this.GetEmployeesByHierarchy();
        }
        #endregion 
    }
}