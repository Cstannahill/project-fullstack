using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Jobs;
using Sabio.Models;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System.Data.SqlClient;
using System;
using Sabio.Models.Requests.Tasks;
using Sabio.Models.Domain.Tasks;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TaskBoard;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskApiController : ControllerBase
    {
        private ITaskService _service = null;
        private IAuthenticationService<int> _authService = null;

        public TaskApiController(ITaskService service, IAuthenticationService<int> authService)
        {
            _service = service;
            _authService = authService;
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<KanbanTask>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                KanbanTask task = _service.Get(id);
                if (task == null)
                {
                    code = 404;
                    response = new ErrorResponse("Task not found.");
                }
                else
                {
                    response = new ItemResponse<KanbanTask> { Item = task };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("board/{id:int}")]
        public ActionResult<ItemResponse<TaskBoard>> GetBoardById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                TaskBoard board = _service.GetTaskBoardById(id);
                if (board == null)
                {
                    code = 404;
                    response = new ErrorResponse("Task not found.");
                }
                else
                {
                    response = new ItemResponse<TaskBoard> { Item = board };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemsResponse<List<TaskCategoryWithTasks>>> GetTaskLists()
        {
            int code = 200;
            BaseResponse response = null;
            List<TaskCategoryWithTasks> kanbanTaskList = new List<TaskCategoryWithTasks>();

            try
            {
                kanbanTaskList = _service.GetTaskLists();
                

                if (kanbanTaskList == null)
                {
                    code = 404;
                    response = new ErrorResponse("Task not found.");
                }
                else
                {
                    response = new ItemsResponse<TaskCategoryWithTasks> { Items = kanbanTaskList };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(code, response);
        }

        [HttpGet("all")]
        public ActionResult<ItemResponse<KanbanTasksWithCat>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            KanbanTasksWithCat kanbanTaskList = new KanbanTasksWithCat();

            try
            {
                kanbanTaskList.Tasks = _service.GetAll();
                kanbanTaskList.TaskCategories = _service.GetAllCategories();

                if (kanbanTaskList == null)
                {
                    code = 404;
                    response = new ErrorResponse("Task not found.");
                }
                else
                {
                    response = new ItemResponse<KanbanTasksWithCat> { Item = kanbanTaskList };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(code, response);
        }

   
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(TaskAddRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 201;
            BaseResponse response = null;

            try
            {
                int id = _service.Add(model, userId);

                code = 201;
                response = new ItemResponse<int> { Item = id };
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpPut("reorder")]
        public ActionResult<SuccessResponse> UpdateIndex(List<TaskUpdateRequest> models)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                foreach(TaskUpdateRequest model in models)
                { 
                     _service.Update(model, userId);
                }
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpGet("user/boards")]
        public ActionResult<ItemsResponse<TaskBoardMinimum>> GetByUserId()
        {
            int userId = _authService.GetCurrentUserId();
            int code = 201;
            BaseResponse response = null;

            try
            {
                List<TaskBoardMinimum> taskBoards = _service.GetUserList(userId);

                code = 201;
                response = new ItemsResponse<TaskBoardMinimum> { Items = taskBoards };
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("label")]
        public ActionResult<ItemResponse<int>> CreateLabel(TaskLabelAddRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 201;
            BaseResponse response = null;

            try
            {
                int id = _service.CreateLabel(model);

                code = 201;
                response = new ItemResponse<int> { Item = id };
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("labelpairs")]
        public ActionResult<SuccessResponse> AddLabel(LabelTaskAddRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 201;
            BaseResponse response = null;

            try
            {
                 _service.AddTaskLabel(model);

                code = 201;
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(TaskUpdateRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }

            return StatusCode(code, response);
        }
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"General Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
    }
}
