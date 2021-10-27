using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Domain.DTOs;
using AutoMapper;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<IList<OutboundPostDto>> { }

        public class Handler : IRequestHandler<Query, IList<OutboundPostDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<IList<OutboundPostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await _context.Posts.ToListAsync(cancellationToken);

                var postsForReturn = _mapper.Map<IList<OutboundPostDto>>(posts);

                return postsForReturn;
            }
        }
    }
}