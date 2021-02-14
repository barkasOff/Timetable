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
            if (context.Subjects.Any())
                return ;

            var subjects = new List<Subject>
            {
                new Subject
                {
                    Discipline = "Безопасность жизнедеятельности",
                    Cabinet = 419,
                    Building = 5,
                    Week = true,
                    Day = "Понедельник",
                    Type = "Практика",
                    Teacher = "Калини Владимир Юрьевич"
                },
                new Subject
                {
                    Discipline = "Безопасность жизнедеятельности",
                    Cabinet = 410,
                    Building = 7,
                    Week = false,
                    Day = "Понедельник",
                    Type = "Практика",
                    Teacher = "Калини Владимир Юрьевич"
                },
                new Subject
                {
                    Discipline = "Технология разработки программного обеспечения",
                    Cabinet = 422,
                    Building = 5,
                    Week = false,
                    Day = "Понедельник",
                    Type = "Лекция",
                    Teacher = "Александров Андрей Юрьевич"
                },
                new Subject
                {
                    Discipline = "Безопасность жизнедеятельности",
                    Cabinet = 422,
                    Building = 5,
                    Week = false,
                    Day = "Понедельник",
                    Type = "Лекция",
                    Teacher = "Калини Владимир Юрьевич"
                },
            };

            await context.Subjects.AddRangeAsync(subjects);
            await context.SaveChangesAsync();
        }
    }
}