using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
  public class Main
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;

      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await _context.Users
          .Include(u => u.Photos)
          .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

        if (user == null)
          return (null);
        var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

        if (photo == null)
          return (null);
        var curMain = user.Photos.FirstOrDefault(p => p.IsMain);

        if (curMain != null)
          curMain.IsMain = false;
        photo.IsMain = true;
        var success = await _context.SaveChangesAsync() > 0;

        if (success)
          return Result<Unit>.Success(Unit.Value);
        return Result<Unit>.Failure("Ошибка при обновление главной фото");
      }
    }
  }
}