using System;
using System.Collections.Generic;

namespace Domain
{
  public class Day
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ICollection<Subject> Subjects { get; set; }
    public DateTime Date { get; set; }
  }
}