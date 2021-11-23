using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.DTOs;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<OutboundPostDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, OutboundPostDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<OutboundPostDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FindAsync(new object[] {request.Id}, cancellationToken);

                var postForReturn = _mapper.Map<OutboundPostDto>(post);

                return postForReturn;
            }
        }
    }
}