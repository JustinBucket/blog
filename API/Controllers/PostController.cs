using System;
using System.Threading.Tasks;
using BucketDatabase;
using BucketDatabase.Query;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly BlogModel _model;
        public PostController(BlogModel model)
        {
            _model = model;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            return Ok(await _model.Posts.ReadAllNodes<Post>());
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(Guid id)
        {
            var param = new QueryParameter()
            {
                Id = id
            };

            var result = await _model.Posts.Query<Post>(param);

            return Ok(result.IdMatch);
        }

        [HttpGet("type/{type}")]
        public async Task<IActionResult> GetTypePosts(string type)
        {
            var param = new QueryParameter();

            var queryable = new QueryableEntry()
            {
                PropertyName = "Type",
                PropertyValue = type
            };

            param.QueryableEntries.Add(queryable);

            var results = await _model.Posts.Query<Post>(param);

            // return Ok(type);

            return Ok(results.QueryableMatches);
        }

    }
}