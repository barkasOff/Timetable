using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Subjects;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class SubjectsController : BaseController
  {
    [HttpGet]
    public async Task<ActionResult<List<Subject>>> GetSubjects() =>
      await Mediator.Send(new List.Query());
    [HttpGet("{id}")]
    public async Task<ActionResult<Subject>> GetSubject(Guid id) =>
      await Mediator.Send((new Details.Query { Id = id }));
    [HttpPost]
    public async Task<IActionResult> AddSubject(Subject subject) =>
      Ok(await Mediator.Send(new Create.Command { Subject = subject }));
    [HttpPut("{id}")]
    public async Task<IActionResult> EditSubject(Guid id, Subject subject)
    {
      subject.Id = id;
      return (Ok(await Mediator.Send(new Edit.Command { Subject = subject })));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubject(Guid id) =>
      Ok(await Mediator.Send(new Delete.Command { Id = id }));
  }
}