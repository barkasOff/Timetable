using System;
using System.Threading.Tasks;
using Application.Groups;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class GroupsController : BaseController
  {
    [HttpGet]
    public async Task<IActionResult> GetGroups() =>
      HandleResult(await Mediator.Send(new List.Query()));
    [HttpGet("{id}")]
    public async Task<IActionResult> GetGroup(Guid id) =>
      HandleResult(await Mediator.Send((new Details.Query { Id = id })));
    [HttpPost]
    public async Task<IActionResult> AddGroup(Group group) =>
      HandleResult(await Mediator.Send(new Create.Command { Group = group }));
    [HttpPut("{id}")]
    public async Task<IActionResult> EditGroup(Guid id, Group group)
    {
      group.Id = id;
      return (HandleResult(await Mediator.Send(new Edit.Command { Group = group })));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGroup(Guid id) =>
      HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
  }
}