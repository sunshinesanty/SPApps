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
        [TestMethod]
        public void GetEmployeeByHeirarchyTest()
        {
            EmployeesRepository EmployeeRepo = new EmployeesRepository();
            IList<Employee> EmployeeList = EmployeeRepo.EmployeesList;
            var SortedEmployeeList = EmployeeList.OrderBy(emp => emp.ManagerID).ToArray();
            Assert.AreEqual(SortedEmployeeList.Length, EmployeeRepo.GetEmployeesByHeirarchy().Count);
        }
    }
}
