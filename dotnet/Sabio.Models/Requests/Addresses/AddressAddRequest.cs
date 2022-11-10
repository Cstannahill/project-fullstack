using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Addresses
{
    public class AddressAddRequest
    {
        [Required]
        public string LineOne { get; set; }
        [Required]
        [Range(1,Int32.MaxValue)]
        public int SuiteNumber { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public bool? IsActive { get; set; }
        [Required]
        [Range(-90.00,90.00)]
        public double? Lat { get; set; }
        [Required]
        [Range(-180.00, 180.00)]
        public double? Long { get; set; }
    }


}
