using System;

namespace Models
{
    public class Application
    {
        public int Id { get; set; }
        public string Company { get; set; }
        public string JobTitle { get; set; }
        public string Salary { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsClosed { get; set; }
        public bool ReceivedCall { get; set; }
        public bool OfferedInterview { get; set; }
        public bool ReceivedOffer { get; set; }
        public string Location { get; set; }
        public string OfferAmount { get; set; }
        public DateTime DateModified { get; set; }
    }
}