using Sabio.Data.Providers;
using Sabio.Models.Domain.Jobs;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Tasks;
using Sabio.Data;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Jobs;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain.Tasks;
using Sabio.Models.Domain.Users;
using Sabio.Models.Domain.TaskBoard;
using System.Reflection;

namespace Sabio.Services
{
    public class TaskService : ITaskService
    {
        IDataProvider _data = null;

        public TaskService(IDataProvider data)
        {
            _data = data;
        }

        public KanbanTask Get(int id)
        {
            string procName = "[dbo].[Tasks_SelectById]";
            KanbanTask task = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                task = MapSingleTask(reader, ref startingIndex);
            }
            );
            return task;
        }

        public void AddTaskLabel(LabelTaskAddRequest model)
        {
            string procName = "[dbo].[TaskLabel_InsertPair]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@TaskId", model.TaskId);
                col.AddWithValue("@TaskLabelTypeId", model.TaskLabelTypeId);
            },
            returnParameters: null);
        }

        public TaskBoard GetTaskBoardById(int boardId)
        {
            string procName = "[dbo].[TaskBoard_SelectById]";
            TaskBoard board = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@TaskBoardId", boardId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                board = MapSingleBoard(reader, ref startingIndex);
            }
            );
            return board;
        }
        public List<KanbanTask> GetAll()
        {
            string procName = "[dbo].[Tasks_SelectAll]";
            List<KanbanTask> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                KanbanTask task = MapSingleTask(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<KanbanTask>();
                }

                list.Add(task);
            });
            return list;
        }

        public List<TaskBoardMinimum> GetUserList(int userId)
        {
            string procName = "[dbo].[TaskBoard_SelectByUserId]";
            List<TaskBoardMinimum> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                TaskBoardMinimum task = MapSingleBoardId(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<TaskBoardMinimum>();
                }

                list.Add(task);
            });
            return list;
        }

        public List<TaskCategory> GetAllCategories()
        {
            string procName = "[dbo].[TaskCategories_SelectAll]";
            List<TaskCategory> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                TaskCategory task = MapSingleCategory(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<TaskCategory>();
                }

                list.Add(task);
            });
            return list;
        }

        public List<TaskCategoryWithTasks> GetTaskLists()
        {
            string procName = "[dbo].[Tasks_SelectByCategory]";
            List<TaskCategoryWithTasks> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                TaskCategoryWithTasks taskList = MapSingleTaskList(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<TaskCategoryWithTasks>();
                }
                list.Add(taskList);
            });
            return list;
        }

        public int Add(TaskAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Tasks_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
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

        public void Update(TaskUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Tasks_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Id", model.Id);
                if (model.Description != null)
                {
                    col.AddWithValue("@Description", model.Description);
                }
                else
                {
                    col.AddWithValue("@Description", DBNull.Value);
                }

            },
            returnParameters: null);
        }

        public int CreateLabel(TaskLabelAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[TaskLabel_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Name", model.Name);
                col.AddWithValue("@Color", model.Color);
                col.AddWithValue("@TaskBoardId", model.TaskBoardId);
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
        public void Delete(int id)
        {
            string procName = "[dbo].[Tasks_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            },
            returnParameters: null);
        }
        private static void AddCommonParams(TaskAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@CategoryId", model.CategoryId);
            col.AddWithValue("@Index", model.Index);
        }

        private static TaskCategoryWithTasks MapSingleTaskList(IDataReader reader, ref int startingIndex)
        {
            TaskCategoryWithTasks taskList = new TaskCategoryWithTasks();

            taskList.Id = reader.GetSafeInt32(startingIndex++);
            taskList.Name= reader.GetSafeString(startingIndex++);
            taskList.Tasks = reader.DeserializeObject<List<KanbanTask>>(startingIndex++);
            return taskList;
        }
        private static KanbanTask MapSingleTask(IDataReader reader, ref int startingIndex)
        {
            KanbanTask task = new KanbanTask();

            task.Id = reader.GetSafeInt32(startingIndex++);
            task.Title = reader.GetSafeString(startingIndex++);
            task.CategoryId = reader.GetSafeInt32(startingIndex++);
            task.Index = reader.GetSafeInt32(startingIndex++);
            task.Description = reader.GetSafeString(startingIndex++);
            task.DateCreated = reader.GetSafeDateTime(startingIndex++);
            task.DateModified = reader.GetSafeDateTime(startingIndex++);
            task.CreatedBy = reader.GetSafeInt32(startingIndex++);
            task.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            return task;
        }

        private static TaskCategory MapSingleCategory(IDataReader reader, ref int startingIndex)
        {
            TaskCategory task = new TaskCategory();

            task.Id = reader.GetSafeInt32(startingIndex++);
            task.Name = reader.GetSafeString(startingIndex++);
            return task;
        }

        private static TaskBoardMinimum MapSingleBoardId(IDataReader reader, ref int startingIndex)
        {
            TaskBoardMinimum taskBoard = new TaskBoardMinimum();

            taskBoard.Id = reader.GetSafeInt32(startingIndex++);
            taskBoard.Name = reader.GetSafeString(startingIndex++);
            return taskBoard;
        }

        private static TaskBoard MapSingleBoard(IDataReader reader, ref int startingIndex)
        {
            TaskBoard taskBoard = new TaskBoard();
            taskBoard.Id = reader.GetSafeInt32(startingIndex++);
            taskBoard.Name = reader.GetSafeString(startingIndex++);
            taskBoard.DateCreated= reader.GetSafeDateTime(startingIndex++);
            taskBoard.DateModified= reader.GetSafeDateTime(startingIndex++);
            taskBoard.CreatedBy = reader.GetSafeInt32(startingIndex++);
            taskBoard.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            taskBoard.Members = reader.DeserializeObject<List<User>>(startingIndex++);
            taskBoard.TaskLabelOptions = reader.DeserializeObject<List<TaskLabel>>(startingIndex++);
            taskBoard.Categories = reader.DeserializeObject<List<TaskCategoryWithTasks>>(startingIndex++);
            return taskBoard;
        }
    }
}
