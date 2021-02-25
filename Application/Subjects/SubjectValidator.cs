using Domain;
using FluentValidation;

namespace Application.Subjects
{
  public class SubjectValidator : AbstractValidator<Subject>
  {
    public SubjectValidator()
    {
        RuleFor(x => x.Building).NotEmpty();
        RuleFor(x => x.Cabinet).NotEmpty();
        RuleFor(x => x.Day).NotEmpty();
        RuleFor(x => x.Discipline).NotEmpty();
        RuleFor(x => x.Teacher).NotEmpty();
        RuleFor(x => x.Type).NotEmpty();
        RuleFor(x => x.Week).NotEmpty();
    }
  }
}