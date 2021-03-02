using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedDataAsync(DataContext context)
    {
      if (context.Groups.Any())
        return;

      var groups = new List<Group>
      {
        new Group
        {
          Number = "4343",
          Weeks = new List<Week>
          {
            new Week
            {
              IsEven = true,
              Days = new List<Day>
              {
                new Day
                {
                  Name = "Понедельник",
                  Subjects = new List<Subject>
                  {
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 419,
                      Building = 5,
                      Type = "Практика"
                    },
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 410,
                      Building = 7,
                      Type = "Практика"
                    },
                    new Subject
                    {
                      Discipline = "Технология разработки программного обеспечения",
                      Cabinet = 422,
                      Building = 5,
                      Type = "Лекция"
                    },
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 422,
                      Building = 5,
                      Type = "Лекция"
                    },
                  }
                }
              }
            }
          }
        },
        new Group
        {
          Number = "4341",
          Weeks = new List<Week>
          {
            new Week
            {
              IsEven = true,
              Days = new List<Day>
              {
                new Day
                {
                  Name = "Понедельник",
                  Subjects = new List<Subject>
                  {
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 419,
                      Building = 5,
                      Type = "Практика"
                    },
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 410,
                      Building = 7,
                      Type = "Практика"
                    },
                    new Subject
                    {
                      Discipline = "Технология разработки программного обеспечения",
                      Cabinet = 422,
                      Building = 5,
                      Type = "Лекция"
                    },
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 422,
                      Building = 5,
                      Type = "Лекция"
                    },
                  }
                }
              }
            }
          }
        },
        new Group
        {
          Number = "4338",
          Weeks = new List<Week>
          {
            new Week
            {
              IsEven = true,
              Days = new List<Day>
              {
                new Day
                {
                  Name = "Понедельник",
                  Subjects = new List<Subject>
                  {
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 419,
                      Building = 5,
                      Type = "Практика"
                    },
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 410,
                      Building = 7,
                      Type = "Практика"
                    },
                    new Subject
                    {
                      Discipline = "Технология разработки программного обеспечения",
                      Cabinet = 422,
                      Building = 5,
                      Type = "Лекция"
                    },
                    new Subject
                    {
                      Discipline = "Безопасность жизнедеятельности",
                      Cabinet = 422,
                      Building = 5,
                      Type = "Лекция"
                    },
                  }
                }
              }
            }
          }
        }
      };

      await context.Groups.AddRangeAsync(groups);
      await context.SaveChangesAsync();
    }
  }
}