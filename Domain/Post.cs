using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;

namespace Domain
{
    public class Post
    {
        public Guid Id { get ; set ; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public IList<string> Paragraphs { get; set; }
        public DateTime CreationDate { get; set; }
        public MediaType Type { get; set; }
        public string ImagePath { get; set; }
    }
}