using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Day, DayDTO>();
      CreateMap<Subject, SubjectDTO>();
      CreateMap<Group, Group>();
      CreateMap<Group, GroupDTO>();
      CreateMap<GroupStudent, Profiles.Profile>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Student.DisplayName))
        .ForMember(d => d.Username, o => o.MapFrom(s => s.Student.UserName));
    }
  }
}