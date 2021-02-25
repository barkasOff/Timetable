using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
  [ApiController]
  [Route("timetable/[controller]")]
  public class BaseController : ControllerBase
  {
    private IMediator _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    protected ActionResult HandleResult<T>(Result<T> result)
    {
      if (result == null)
        return (NotFound());
      else if (result.IsSucces && result.Value != null)
        return (Ok(result.Value));
      else if (result.IsSucces && result.Value == null)
        return (NotFound());
      return (BadRequest(result.Error));
    }
  }
}