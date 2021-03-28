using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class PhotosController : BaseController
  {
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] Add.Command command) =>
      HandleResult(await Mediator.Send(command));
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) =>
      HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    [HttpPost("{id}/main")]
    public async Task<IActionResult> Main(string id) =>
      HandleResult(await Mediator.Send(new Main.Command { Id = id }));
  }
}