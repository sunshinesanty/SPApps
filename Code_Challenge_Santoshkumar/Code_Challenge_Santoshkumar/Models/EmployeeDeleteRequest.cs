using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Code_Challenge_Santoshkumar.Models
{
    public class EmployeeDeleteRequest
    {
        public int Id { get; set; }
        public int? AlertnativeManagerId { get; set; }
    }
}