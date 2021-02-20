using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Subjects
{
  public class Delete
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;

      public Handler(DataContext context) =>
        _context = context;

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var subject = await _context.Subjects.FindAsync(request.Id);

        _context.Subjects.Remove(subject);
        await _context.SaveChangesAsync();
        return (Unit.Value);
      }
    }
  }
}