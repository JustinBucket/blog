using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class TypeList
    {
        public class Query : IRequest<IList<Post>>
        {
            public MediaType Type { get; set; }
        }

        public class Handler : IRequestHandler<Query, IList<Post>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<IList<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                var filteredPosts = await _context.Posts.Where(x => x.Type == request.Type).ToListAsync(cancellationToken);

                return filteredPosts;
            }
        }
    }
}