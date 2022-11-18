using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Tasks
{
    public class KanbanTasksWithCat
    {
        public List<KanbanTask> Tasks { get; set; }
        public List<TaskCategory> TaskCategories { get; set; }
    }
}
