using System.Collections.Generic;
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
  public class List
  {
    public class Query : IRequest<Result<List<GroupDTO>>> { }
    public class Handler : IRequestHandler<Query, Result<List<GroupDTO>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<List<GroupDTO>>> Handle(Query request, CancellationToken cancellationToken) =>
        Result<List<GroupDTO>>.Success(await _context.Groups
          .ProjectTo<GroupDTO>(_mapper.ConfigurationProvider)
          .ToListAsync());
    }
  }
}