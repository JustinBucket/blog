using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<IList<Post>> { }

        public class Handler : IRequestHandler<Query, IList<Post>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<IList<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Posts.ToListAsync(cancellationToken);
            }
        }
    }
}