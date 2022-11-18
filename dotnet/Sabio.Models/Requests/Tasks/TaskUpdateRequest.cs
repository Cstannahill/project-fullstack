using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Tasks
{
    public class TaskUpdateRequest : TaskAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
