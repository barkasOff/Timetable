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
  public class Delete
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IPhotoAccessor _photoAccessor;
      private readonly IUserAccessor _userAccessor;

      public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _photoAccessor = photoAccessor;
        _context = context;
      }

      public IUserAccessor UserAccessor => _userAccessor;

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
          var result = await _photoAccessor.DeletPhoto(photo.Id);

          if (result == null)
            return Result<Unit>.Failure("Ошибка при удалении фото из Cloudinary");
          user.Photos.Remove(photo);
          var success = await _context.SaveChangesAsync() > 0;

          if (success)
            return Result<Unit>.Success(Unit.Value);
          return Result<Unit>.Failure("Ошибка при удалении фото из API");
      }
    }
  }
}