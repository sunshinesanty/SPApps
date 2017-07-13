using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Code_Challenge_Santoshkumar.Models
{
    public class OrgChartHeirarchy
    {
        public Employee Manager { get; set; }
        public IList<OrgChartHeirarchy> Reportees
        {
            get
            {
                return EmployeesRepository.EmployeesList.Where(emp => emp.ManagerID == this.Manager.Id).Select(emp => {
                    return new OrgChartHeirarchy() { Manager = emp };
                }).ToArray();
            }
        }
    }
}