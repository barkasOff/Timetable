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
      var students = new List<User>();

      if (!userManager.Users.Any())
      {
        students.AddRange(
          new List<User>
          {
            new User { DisplayName = "Boris", UserName = "boris", Email = "boris@test.com" },
            new User { DisplayName = "Adel", UserName = "adel", Email = "adel@test.com" },
            new User { DisplayName = "Vova", UserName = "vova", Email = "vova@test.com" }
          }
        );

        foreach (var user in students)
          await userManager.CreateAsync(user, "Pa$$w0rd");
      }
      
      if (context.Groups.Any())
        return;

      var groups = new List<Group>();

      groups.Add(new Group { Number = "Bonus" });
      for (int i = 1301; i <= 5344; ++i)
      {
        if (i % 100 == 45)
          i += 1000 - 44;
        groups.Add(
          new Group
          {
            Students = i == 4343 ? new List<GroupStudent>
            {
              new GroupStudent { Student = students[0] },
              new GroupStudent { Student = students[1] },
              new GroupStudent { Student = students[2] },
            } : new List<GroupStudent>(),
            Number = $"{i}",
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
        );
      }

      await context.Groups.AddRangeAsync(groups);
      await context.SaveChangesAsync();
    }
  }
}