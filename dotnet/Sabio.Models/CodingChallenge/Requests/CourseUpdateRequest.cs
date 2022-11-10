using Sabio.Models.CodingChallenge.Requests;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Sabio.Models;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Courses
{
    public class CourseUpdateRequest : CourseAddRequest , IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}
