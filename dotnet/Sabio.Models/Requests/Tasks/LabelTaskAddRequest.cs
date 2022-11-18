using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Tasks
{
    public class LabelTaskAddRequest
    {
        public int TaskId { get; set; }
        public int TaskLabelTypeId { get; set; }
    }
}
