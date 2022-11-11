using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Music;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class MusicService : IMusicService
    {
        IDataProvider _data = null;

        public MusicService(IDataProvider data)
        {
            _data = data;
        }

        public List<Album> GetAll()
        {
            string procName = "[dbo].[DiscogsCollection_SelectAll]";

            List<Album> albums = null;
            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Album album = MapSingleAlbum(reader, ref startingIndex);

                if (albums == null)
                {
                    albums = new List<Album>();
                }
                albums.Add(album);
            });
            return albums;
        }

        public Paged<Album> Pagination(int pageIndex, int pageSize)
        {
            string procName = "dbo.DiscogsCollection_Pagination";
            Paged<Album> pagedList = null;
            List<Album> albums = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                Album album = MapSingleAlbum(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex);

                if (albums == null)
                {
                    albums = new List<Album>();
                }
                albums.Add(album);
            });
            if(albums != null)
            {
                pagedList = new Paged<Album>(albums, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private static Album MapSingleAlbum(IDataReader reader, ref int startingIndex)
        {
            int i = 0;
            Album album = new Album();

            album.Id = reader.GetSafeInt32(i++);
            album.Artist = reader.GetSafeString(i++);
            album.Title = reader.GetSafeString(i++);
            album.Label = reader.GetSafeString(i++);
            album.Format = reader.GetSafeString(i++);
            album.Released = reader.GetSafeInt32(i++);
            return album;
        }

    }
}
