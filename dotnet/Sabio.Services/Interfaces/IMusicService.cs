using Sabio.Models;
using Sabio.Models.Domain.Music;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IMusicService
    {
        List<Album> GetAll();
        Paged<Album> Pagination(int pageIndex, int pageSize);
    }
}
