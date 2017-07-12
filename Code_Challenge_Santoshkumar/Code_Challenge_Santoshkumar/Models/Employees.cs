using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Code_Challenge_Santoshkumar.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please provide the employee First Name")]
        public string FirstName { get; set; }        
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please provide the employee Last Name")]
        public string LastName { get; set; }
        public string DisplayName { get { return string.Format("{0} {1}", this.FirstName, this.LastName); } }
        public int? ManagerID { get; set; }
    }
}