using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Tasks
{
    public class TaskAddRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Title { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int Index { get; set; }
    }
}
