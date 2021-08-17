using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using BucketDatabase.Query;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(BlogModel model)
        {
            var param = new QueryParameter()
            {
                FileId = model.Posts.FileId
            };

            var result = await model.Posts.Query<Post>(param);

            if (result.FileMatches.Count == 0)
            {
                var jsonString = File.ReadAllText("SeedData.json");

                var objects = JsonSerializer.Deserialize<IList<Post>>(jsonString);

                foreach (var i in objects)
                {
                    await model.Posts.WriteToNode<Post>(i);
                }
            }
        }
    }
}