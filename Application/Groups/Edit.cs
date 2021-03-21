using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Groups
{
  public class Edit
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
      private readonly IMapper _mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var subject = await _context.Groups.FindAsync(request.Group.Id);

        if (subject == null)
          return (null);
        _mapper.Map(request.Group, subject);
        
        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
          return (Result<Unit>.Failure("Ошибка в редактировании занятия"));
        return (Result<Unit>.Success(Unit.Value));
      }
    }
  }
}