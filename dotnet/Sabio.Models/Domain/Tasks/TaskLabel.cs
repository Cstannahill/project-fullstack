using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Tasks
{
    public class TaskLabel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public int? TaskBoardId { get; set; }
    }
}
