using Sabio.Models.Domain.Tasks;
using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TaskBoard
{
    public class TaskBoard
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set;}
        public List<User> Members { get; set; }
        public List<TaskLabel> TaskLabelOptions { get; set; }
        public List<TaskCategoryWithTasks> Categories { get; set; }
    }
}
