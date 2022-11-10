using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;
using Sabio.Models.Domain.Student;
using Sabio.Models.Requests.Courses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class CourseService : ICourseService
    {
        IDataProvider _data = null;

        public CourseService(IDataProvider data)
        {
            _data = data;
        }
        public int AddCourse(CourseAddRequest request)
        {
            int id = 0;
            string procName = "dbo.Courses_Insert";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);

                SqlParameter IdOut = new SqlParameter("@Id", SqlDbType.Int);
                IdOut.Direction = ParameterDirection.Output;

                col.Add(IdOut);
            },
             returnParameters: delegate (SqlParameterCollection returnCollection)
             {
                 object oId = returnCollection["@Id"].Value;

                 int.TryParse(oId.ToString(), out id);
             });
            return id;
        }
        public Course GetCourseById(int id)
        {
            Course course = null;
            string procName = "dbo.Courses_SelectById";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                course = MapSingleCourse(reader, ref startingIndex);
            }
            );
            return course;
        }
        public void UpdateCourse(CourseUpdateRequest model)
        {
            string procName = "dbo.Courses_Update";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }
        public void DeleteStudent(int id)
        {
            string procName = "[dbo].[Students_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            },
            returnParameters: null);
        }
        public Paged<Course> GetCoursesByPage(int pageIndex, int pageSize)
        {
            string procName = "dbo.Courses_Pagination";
            Paged<Course> pagedList = null;
            List<Course> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Course friend = MapSingleCourse(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<Course>();
                    }
                    list.Add(friend);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Course>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }


        private static void AddCommonParams(CourseAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", request.Name);
            col.AddWithValue("@Description", request.Description);
            col.AddWithValue("@SeasonTermId", request.SeasonTermId);
            col.AddWithValue("@TeacherId", request.TeacherId);
        }
        private static Course MapSingleCourse(IDataReader reader, ref int startingIndex)
        {
            Course course = new Course();
            course.Id = reader.GetSafeInt32(startingIndex++);
            course.Name = reader.GetSafeString(startingIndex++);
            course.Description = reader.GetSafeString(startingIndex++);
            course.SeasonTerm = reader.GetSafeString(startingIndex++);
            course.Teacher = reader.GetSafeString(startingIndex++);
            course.Students = reader.DeserializeObject<List<Student>>(startingIndex++);
            return course;
        }
    }
}
