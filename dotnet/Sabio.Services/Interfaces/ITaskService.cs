using Sabio.Models.Domain;
using Sabio.Models.Domain.TaskBoard;
using Sabio.Models.Domain.Tasks;
using Sabio.Models.Requests.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ITaskService
    {
        public List<KanbanTask> GetAll();
        public KanbanTask Get(int id);
        public int Add(TaskAddRequest model, int userId);
        public void Update(TaskUpdateRequest model, int userId);
        public void Delete(int id);
        public List<TaskCategory> GetAllCategories();
        public List<TaskCategoryWithTasks> GetTaskLists();
        public int CreateLabel(TaskLabelAddRequest model);
        public void AddTaskLabel(LabelTaskAddRequest model);
        public List<TaskBoardMinimum> GetUserList(int userId);
        public TaskBoard GetTaskBoardById(int boardId);
    }
}
