using System;
using System.Collections.Generic;

namespace Domain
{
  public class Week
  {
    public Guid Id { get; set; }
    public bool IsEven { get; set; }
    public ICollection<Day> Days { get; set; }
    public DateTime StartDate { get; set; }
  }
}