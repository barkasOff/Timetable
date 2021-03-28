using System;

namespace Domain
{
  public class GroupStudent
  {
    public string StudentId { get; set; }
    public User Student { get; set; }
    public Guid GroupId { get; set; }
    public Group Group { get; set; }
  }
}