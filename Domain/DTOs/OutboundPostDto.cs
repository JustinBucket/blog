using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class OutboundPostDto
    {
        public Guid Id { get ; set ; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Body { get; set; }
        public DateTime CreationDate { get; set; }
        public String TypeString { get; set; }
        public string ImagePath { get; set; }
    }
}