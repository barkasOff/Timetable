using System.Linq;
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
    public class Query : IRequest<Result<PagedList<GroupDTO>>>
    {
      public PagingParams PagingParams { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<PagedList<GroupDTO>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<PagedList<GroupDTO>>> Handle(Query request, CancellationToken cancellationToken) =>
        Result<PagedList<GroupDTO>>.Success(await PagedList<GroupDTO>.CreateAsync(_context.Groups
          .ProjectTo<GroupDTO>(_mapper.ConfigurationProvider)
          .OrderBy(g => g.Number)
          .AsQueryable(), request.PagingParams.PageNumber, request.PagingParams.PageSize));
    }
  }
}