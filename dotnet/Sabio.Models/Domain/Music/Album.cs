using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Music
{
    public class Album
    {
        public int Id { get; set; }
        public string Artist { get; set; }
        public string Title { get; set; }
        public string Label { get; set; }
        public string Format { get; set; }
        public int Released { get; set; }

    }
}
