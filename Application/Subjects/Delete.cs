using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subjects
{
  public class Delete
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context) =>
        _context = context;

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var groups = await _context.Groups
          .Include(x => x.Days)
          .ThenInclude(x => x.Subjects)
          .ToListAsync();
        var group = await Task.Run(() => groups.Find(x => x.Id == request.Id));

        if (group == null)
          return (null);
        _context.Groups.Remove(group);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
          return (Result<Unit>.Failure("Ошибка в удалении занятия"));
        return (Result<Unit>.Success(Unit.Value));
      }
    }
  }
}