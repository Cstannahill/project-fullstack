using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Applications
{
    public class ApplicationAddRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Company { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string JobTitle { get; set; }
        public string Salary { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Location { get; set; }
    }
}
