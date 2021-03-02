using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subjects
{
  public class Details
  {
    public class Query : IRequest<Result<Group>>
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<Group>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context) =>
        _context = context;
      public async Task<Result<Group>> Handle(Query request, CancellationToken cancellationToken)
      {
        var groups = await _context.Groups
          .Include(x => x.Weeks)
          .ThenInclude(x => x.Days)
          .ThenInclude(x => x.Subjects)
          .ToListAsync();
        var group = await Task.Run(() => groups.Find(x => x.Id == request.Id));

        return (Result<Group>.Success(group));
      }
    }
  }
}