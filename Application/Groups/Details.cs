using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Groups
{
  public class Details
  {
    public class Query : IRequest<Result<GroupDTO>>
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<GroupDTO>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }
      public async Task<Result<GroupDTO>> Handle(Query request, CancellationToken cancellationToken) =>
        Result<GroupDTO>.Success(await _context.Groups
          .ProjectTo<GroupDTO>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync(g => g.Id == request.Id));
    }
  }
}