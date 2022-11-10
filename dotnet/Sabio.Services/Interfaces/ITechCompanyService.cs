using Sabio.Models.Domain.TechCompanies;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Jobs;
using Sabio.Models.Requests.TechCompany;

namespace Sabio.Services.Interfaces
{
    public interface ITechCompanyService
    {
        public Paged<TechCompany> Pagination(int pageIndex, int pageSize);
        public Paged<TechCompany> SearchPaginated(int pageIndex, int pageSize, string query);
        public TechCompany Get(int id);
        public List<TechCompany> GetAll();
        public void Delete(int id);
        public int Add(TechCompanyAddRequest request, int userId);
        public void Update(TechCompanyUpdateRequest request, int userId);
    }
}
