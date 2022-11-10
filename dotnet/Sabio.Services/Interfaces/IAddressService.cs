using Sabio.Models.Domain.Addresses;
using Sabio.Models.Requests.Addresses;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IAddressService
    {
        int Add(AddressAddRequest request, int userId);
        Address Get(int id);

        public void Delete(int id);
        List<Address> GetRandomAddresses();
        void Update(AddressUpdateRequest request);
    }
}