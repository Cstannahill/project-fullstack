using Models;
using Sabio.Models.Requests.Applications;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IApplicationService
    {
        public List<Application> GetAllApplications();
        public int Add(ApplicationAddRequest model);
        public void Update(ApplicationUpdateRequest model);
        public void CloseApp(int id);
    }
}
