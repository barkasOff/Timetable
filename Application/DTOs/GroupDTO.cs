using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.DTOs
{
  public class GroupDTO
  {
    public Guid Id { get; set; }
    public string Number { get; set; }
    public ICollection<DayDTO> Days { get; set; }
    public ICollection<GroupStudentDTO> Students { get; set; }
  }
}