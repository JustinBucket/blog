using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Newtonsoft.Json;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var jsonString = File.ReadAllText("SeedData.json");

            var objects = JsonConvert.DeserializeObject<List<Post>>(jsonString);

            foreach (var i in objects)
            {
                context.Posts.Add(i);
            }

            await context.SaveChangesAsync();
            
        }
    }
}