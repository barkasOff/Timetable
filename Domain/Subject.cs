using System;

namespace Domain
{
  public class Subject
  {
    public Guid Id { get; set; }
    public string Discipline { get; set; }
    public int Cabinet { get; set; }
    public int Building { get; set; }
    public string Type { get; set; }
    public Teacher Teacher { get; set; }
  }
}