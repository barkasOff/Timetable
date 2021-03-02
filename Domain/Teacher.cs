using System;
using System.Collections.Generic;

namespace Domain
{
  public class Teacher
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Fathername { get; set; }
    public ICollection<Day> Days { get; set; }
  }
}