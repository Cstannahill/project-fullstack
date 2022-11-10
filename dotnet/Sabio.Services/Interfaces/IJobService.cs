using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Jobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IJobService
    {
        public Job Get(int id);
        public List<Job> GetAll();
        public Paged<Job> Pagination(int pageIndex, int pageSize);
        public Paged<Job> SearchPaginated(int pageIndex, int pageSize, string query);
    
        public void Update(JobUpdateRequest request, int userId);
        public void Delete(int id);
        public int Add(JobAddRequest request, int userId);
    }
}
