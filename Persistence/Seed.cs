using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedDataAsync(DataContext context, UserManager<User> userManager)
    {
      if (!userManager.Users.Any())
      {
        var users = new List<User>
        {
          new User { DisplayName = "Boris", UserName = "boris", Email = "boris@test.com", Position = "student" },
          new User { DisplayName = "Adel", UserName = "adel", Email = "adel@test.com", Position = "student" },
          new User { DisplayName = "Vova", UserName = "vova", Email = "vova@test.com", Position = "student" }
        };

        foreach (var user in users)
          await userManager.CreateAsync(user, "Pa$$w0rd");
      }
      if (context.Groups.Any())
        return;

      var groups = new List<Group>
      {
        new Group
        {
          Number = "4343",
          Days = new List<Day>
          {
            new Day
            {
              Name = "Понедельник",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 419,
                  Building = 5,
                  Type = "Практика"
                }
              }
            },
            new Day
            {
              Name = "Вторник",
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Среда",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Четверг",
              Week = false,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Пятница",
              Week = false,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Технология разработки программного обеспечения",
                  Cabinet = 422,
                  Building = 5,
                  Type = "Лекция"
                },
              }
            },
            new Day
            {
              Name = "Суббота",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Технология разработки программного обеспечения",
                  Cabinet = 422,
                  Building = 5,
                  Type = "Лекция"
                },
              }
            }
          }
        },
        new Group
        {
          Number = "4341",
          Days = new List<Day>
          {
            new Day
            {
              Name = "Понедельник",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 419,
                  Building = 5,
                  Type = "Практика"
                }
              }
            },
            new Day
            {
              Name = "Вторник",
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Среда",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Четверг",
              Week = false,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Пятница",
              Week = false,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Технология разработки программного обеспечения",
                  Cabinet = 422,
                  Building = 5,
                  Type = "Лекция"
                },
              }
            },
            new Day
            {
              Name = "Суббота",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Технология разработки программного обеспечения",
                  Cabinet = 422,
                  Building = 5,
                  Type = "Лекция"
                },
              }
            }
          }
        },
        new Group
        {
          Number = "4338",
          Days = new List<Day>
          {
            new Day
            {
              Name = "Понедельник",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 419,
                  Building = 5,
                  Type = "Практика"
                }
              }
            },
            new Day
            {
              Name = "Вторник",
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Среда",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Четверг",
              Week = false,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Безопасность жизнедеятельности",
                  Cabinet = 410,
                  Building = 7,
                  Type = "Практика"
                },
              }
            },
            new Day
            {
              Name = "Пятница",
              Week = false,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Технология разработки программного обеспечения",
                  Cabinet = 422,
                  Building = 5,
                  Type = "Лекция"
                },
              }
            },
            new Day
            {
              Name = "Суббота",
              Week = true,
              Subjects = new List<Subject>
              {
                new Subject
                {
                  Discipline = "Технология разработки программного обеспечения",
                  Cabinet = 422,
                  Building = 5,
                  Type = "Лекция"
                },
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