using System;

namespace Domain
{
    public class Subject
    {
        // TODO: Разобрать даты и время на отдельный класс
        // TODO: Сделать преподавателя с дисциплиной отдельной сущностью
        public Guid Id { get; set; }
        public int Cabinet { get; set; }
        public int Building { get; set; }
        public bool Week { get; set; }
        public string Day { get; set; }
        public string Type { get; set; }
        public string Teacher { get; set; }
        public string Discipline { get; set; }
    }
}