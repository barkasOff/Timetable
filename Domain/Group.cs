using System;
using System.Collections.Generic;

namespace Domain
{
  public class Group
  {
    public Guid Id { get; set; }
    public string Number { get; set; }
    public ICollection<Day> Days { get; set; }
  }
}