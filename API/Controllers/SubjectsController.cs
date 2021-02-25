using System;
using System.Threading.Tasks;
using Application.Subjects;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class SubjectsController : BaseController
  {
    [HttpGet]
    public async Task<IActionResult> GetSubjects() =>
      HandleResult(await Mediator.Send(new List.Query()));
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubject(Guid id) =>
      HandleResult(await Mediator.Send((new Details.Query { Id = id })));
    [HttpPost]
    public async Task<IActionResult> AddSubject(Subject subject) =>
      HandleResult(await Mediator.Send(new Create.Command { Subject = subject }));
    [HttpPut("{id}")]
    public async Task<IActionResult> EditSubject(Guid id, Subject subject)
    {
      subject.Id = id;
      return (HandleResult(await Mediator.Send(new Edit.Command { Subject = subject })));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubject(Guid id) =>
      HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
  }
}