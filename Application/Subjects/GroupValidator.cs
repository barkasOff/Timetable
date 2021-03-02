using Domain;
using FluentValidation;

namespace Application.Subjects
{
  public class GroupValidator : AbstractValidator<Group>
  {
    public GroupValidator()
    {
      RuleFor(x => x.Number).NotEmpty();
      RuleFor(x => x.Weeks).NotEmpty();
    }
  }
}