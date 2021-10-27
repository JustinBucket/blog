using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class TypeList
    {
        public class Query : IRequest<IList<OutboundPostDto>>
        {
            public MediaType Type { get; set; }
        }

        public class Handler : IRequestHandler<Query, IList<OutboundPostDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<IList<OutboundPostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var filteredPosts = await _context.Posts.Where(x => x.Type == request.Type).ToListAsync(cancellationToken);

                var postsToReturn = _mapper.Map<IList<OutboundPostDto>>(filteredPosts);

                return postsToReturn;
            }
        }
    }
}