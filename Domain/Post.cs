using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using BucketDatabase.Attributes;
using BucketDatabase.Interfaces;

namespace Domain
{
    public class Post : IDbEntry
    {
        public Guid Id { get ; set ; }
        public Guid FileId { get ; set ; }

        [Queryable]
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public IList<string> Paragraphs { get; set; }
        [Queryable]
        public DateTime CreationDate { get; set; }
        [Queryable]
        public MediaType Type { get; set; }
        public string ImagePath { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;
        public event NotifyCollectionChangedEventHandler CollectionChanged;
    }
}