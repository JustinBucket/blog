using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Posts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PostController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IList<Post>>> GetPosts(CancellationToken token)
        {
            var posts = await _mediator.Send(new List.Query(), token);
            return posts.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(Guid id, CancellationToken token)
        {
            var result = await _mediator.Send(new Details.Query{Id = id}, token);

            return result;
        }

        [HttpGet("type/{type}")]
        public async Task<ActionResult<IList<Post>>> GetTypePosts(string type, CancellationToken token)
        {
            MediaType mediaType;
            
            var parseSuccess = Enum.TryParse<MediaType>(type, true, out mediaType);

            if (!parseSuccess)
            {
                return BadRequest($"'{type}' is not a valid MediaType");
            }

            var posts = await _mediator.Send(new TypeList.Query{Type = mediaType}, token);

            return posts.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(Post post, CancellationToken token)
        {
            return Ok(await _mediator.Send(new Create.Command { Post = post }, token));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Post post, CancellationToken token)
        {
            post.Id = id;

            return Ok(await _mediator.Send(new Edit.Command { Post = post }, token));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id, CancellationToken token)
        {
            return Ok(await _mediator.Send(new Delete.Command { Id = id }, token));
        }

    }
}