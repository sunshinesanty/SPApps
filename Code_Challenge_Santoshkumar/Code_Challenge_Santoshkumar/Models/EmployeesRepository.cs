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
        /// <summary>
        /// Initializing a static array of 
        /// </summary>
        private IList<Employee> EmployeesList = new List<Employee>()
        {
            new Employee() { Id = 1, FirstName = "John", LastName= "Smith", ManagerID = 6 },
            new Employee() { Id = 2, FirstName = "Adam", LastName= "Smith", ManagerID = 6 },
            new Employee() { Id = 3, FirstName = "Elen", LastName= "Adam", ManagerID = 2 },
            new Employee() { Id = 4, FirstName = "Eve", LastName= "Smith", ManagerID = 1 },
            new Employee() { Id = 5, FirstName = "Larry", LastName= "Roth" },
            new Employee() { Id = 6, FirstName = "Nic", LastName= "Lawrence" }
        };

        public EmployeesRepository() { }

        public IList<Employee> GetEmployeesByHeirarchy()
        {
            return this.EmployeesList.OrderBy(emp => emp.ManagerID).ToArray();
        }

        public Employee GetEmployeeDetails(int Id)
        {
            return this.EmployeesList.FirstOrDefault(e => e.Id == Id);
        }

        public IList<Employee> AddEmployees(Employee EmployeeDataToAdd)
        {
            EmployeeDataToAdd.Id = this.EmployeesList.OrderBy(emp => emp.Id).Last().Id + 1;
            this.EmployeesList.Add(EmployeeDataToAdd);
            return this.EmployeesList.OrderBy(emp => emp.ManagerID).ToArray();
        }

        public IList<Employee> UpdateEmployee(Employee EmployeeDataToUpdate)
        {
            var EmployeeToUpdate = this.EmployeesList.FirstOrDefault(emp => emp.Id == EmployeeDataToUpdate.Id);
            EmployeeToUpdate.FirstName = EmployeeDataToUpdate.LastName;
            EmployeeToUpdate.LastName = EmployeeDataToUpdate.LastName;
            EmployeeToUpdate.ManagerID = EmployeeDataToUpdate.ManagerID;
            return this.EmployeesList.OrderBy(emp => emp.ManagerID).ToArray();
        }
    }
}