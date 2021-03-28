using System;

namespace Application.DTOs
{
  public class SubjectDTO
  {
    public Guid Id { get; set; }
    public string Discipline { get; set; }
    public int Cabinet { get; set; }
    public int Building { get; set; }
    public string Type { get; set; }
  }
}