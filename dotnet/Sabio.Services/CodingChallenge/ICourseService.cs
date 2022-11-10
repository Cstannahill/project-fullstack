using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;
using Sabio.Models.Requests.Courses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface ICourseService
    {
        public int AddCourse(CourseAddRequest request);
        public Course GetCourseById(int id);
        public void UpdateCourse(CourseUpdateRequest model);
        public void DeleteStudent(int id);
        public Paged<Course> GetCoursesByPage(int pageIndex, int pageSize);
    }
}
