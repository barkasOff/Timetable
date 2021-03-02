using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Subjects
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Group Group { get; set; }
    }
    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator() =>
          RuleFor(x => x.Group).SetValidator(new GroupValidator());
    }
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context) =>
        _context = context;

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        _context.Add(request.Group);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
          return (Result<Unit>.Failure("Ошибка в добавлении занятия"));
        return (Result<Unit>.Success(Unit.Value));
      }
    }
  }
}