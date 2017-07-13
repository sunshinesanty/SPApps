using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Code_Challenge_Santoshkumar.Models;
using System.Collections.Generic;
using System.Linq;

namespace Code_Challenge_Santoshkumar.Tests
{
    [TestClass]
    public class EmployeeDataTest
    {
        EmployeesRepository EmployeeRepo;
        public EmployeeDataTest()
        {
            EmployeeRepo = new EmployeesRepository();
        }

        [TestMethod]
        public void GetEmployees()
        {
            var SortedEmployeeList = EmployeesRepository.EmployeesList.OrderBy(emp => emp.Id).ToArray();
            CollectionAssert.AreEqual(SortedEmployeeList, EmployeeRepo.GetEmployees().ToArray());
        }

        [TestMethod]
        public void GetEmployeeTopLevelEmployees()
        {
            var TopLevelEmployees = EmployeesRepository.EmployeesList.Where(emp => !emp.ManagerID.HasValue || emp.ManagerID == 0).ToArray();
            CollectionAssert.AreEqual(TopLevelEmployees, EmployeeRepo.GetTopLevelEmployees().ToArray());
        }

        [TestMethod]
        public void GetEmployeeById()
        {
            int IDToTest = 6;
            var EmployeForID = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == IDToTest);
            var expectedValue = new OrgChartHeirarchy() { Manager = EmployeForID };
            var actualResult = EmployeeRepo.GetEmployeeDetails(IDToTest);
            Assert.AreEqual(expectedValue.Manager, actualResult.Manager);
            this.CompareReportees(expectedValue.Reportees, actualResult.Reportees);
        }

        [TestMethod]
        public void AddEmployee()
        {
            Employee newEmployee = new Employee();
            newEmployee.FirstName = "Santoshkumar";
            newEmployee.LastName = "Krishnamurthy";
            newEmployee.ManagerID = 5;

            int IdForNeEmployee = EmployeesRepository.EmployeesList.OrderByDescending(emp => emp.Id).First().Id;

            EmployeeRepo.AddEmployees(newEmployee);
            var EmployeAdded = EmployeesRepository.EmployeesList.OrderByDescending(emp => emp.Id).First();
            newEmployee.Id = ++IdForNeEmployee;
            Assert.AreEqual(newEmployee, EmployeAdded);
        }

        [TestMethod]
        public void UpdateEmployee()
        {
            int id = 3;
            Employee updatedEmployee = EmployeesRepository.EmployeesList.First(emp => emp.Id == id);
            updatedEmployee.ManagerID = 1;
            EmployeeRepo.UpdateEmployee(updatedEmployee);

            var EmployeeUpdated = EmployeesRepository.EmployeesList.First(emp => emp.Id == id); ;
            Assert.AreEqual(updatedEmployee, EmployeeUpdated);
        }

        [TestMethod]
        public void DeleteEmployee()
        {
            int id = 4;
            Employee updatedEmployee = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == id);
            EmployeeRepo.DeleteEmployee(updatedEmployee.Id);
            var EmployeeUpdated = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == id);
            Assert.IsNull(EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == id));
        }

        [TestMethod]
        public void DeleteManagerWithoutAlternate()
        {
            int id = 5;
            Employee updatedEmployee = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == id);
            try
            {
                EmployeeRepo.DeleteEmployee(updatedEmployee.Id);
            }
            catch (InvalidOperationException iex) {
                Assert.AreEqual(
                    "You are trying to delete an employee who have other employees reporting to him/her. Please assign reportees to other employee before deleting",
                    iex.Message);
            }
            catch (Exception ex)
            {
                Assert.Fail(ex.ToString());
            }
        }

        [TestMethod]
        public void DeleteManagerWithAlternate()
        {
            int id = 5, alternativeManager = 6;

            Employee deletedEmployee = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == id);
            try
            {
                EmployeeRepo.DeleteEmployee(deletedEmployee.Id, alternativeManager);
            }
            catch (Exception ex)
            {
                Assert.Fail(ex.ToString());
            }
            var EmployeeUpdated = EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == id);
            Assert.IsNull(EmployeesRepository.EmployeesList.FirstOrDefault(emp => emp.Id == id));
        }

        [TestMethod]
        public void GetOrgChart()
        {
            var TopLevelEmployees = EmployeesRepository.EmployeesList.Where(emp => !emp.ManagerID.HasValue || emp.ManagerID == 0).ToArray();
            var expected = TopLevelEmployees.Select(mngr => { return new OrgChartHeirarchy() { Manager = mngr }; }).ToArray();
            var actual = EmployeeRepo.GetEmployeesByHierarchy().ToArray();
            Assert.AreEqual(expected.Length, actual.Length);
            for (int mngrIdx = 0; mngrIdx < expected.Length; mngrIdx++)
            {
                Assert.AreEqual(expected[mngrIdx].Manager, actual[mngrIdx].Manager);
                CompareReportees(expected[mngrIdx].Reportees, actual[mngrIdx].Reportees);
            }
        }

        private void CompareReportees(IList<OrgChartHeirarchy> Exepected, IList<OrgChartHeirarchy> Actual)
        {
            try
            {
                for (int mngrIdx = 0; mngrIdx < Exepected.Count; mngrIdx++)
                {
                    Assert.AreEqual(Exepected[mngrIdx].Manager, Actual[mngrIdx].Manager);
                    CompareReportees(Exepected[mngrIdx].Reportees, Actual[mngrIdx].Reportees);
                }
            }
            catch (Exception ex) { Assert.Fail(ex.Message); }
        }
    }
}
