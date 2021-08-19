using BucketDatabase;
using BucketDatabase.Attributes;

namespace Persistence
{
    public class BlogModel : DatabaseModel
    {
        [Table]
        public DatabaseNode Posts { get; set; }
        public BlogModel(string dbRoot, int nodeSize) : base(dbRoot, nodeSize) { }
    }
}