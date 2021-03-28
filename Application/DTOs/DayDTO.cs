using System;
using System.Collections.Generic;
using Domain;

namespace Application.DTOs
{
  public class DayDTO
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public bool Week { get; set; }
    public ICollection<Subject> Subjects { get; set; }
    public DateTime Date { get; set; }
  }
}