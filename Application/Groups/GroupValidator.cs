using Domain;
using FluentValidation;

namespace Application.Groups
{
  public class GroupValidator : AbstractValidator<Group>
  {
    public GroupValidator()
    {
      RuleFor(x => x.Number).NotEmpty();
      RuleFor(x => x.Days).NotEmpty();
    }
  }
}