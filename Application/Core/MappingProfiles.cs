using System.Linq;
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
      CreateMap<GroupStudent, GroupStudentDTO>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Student.DisplayName))
        .ForMember(d => d.Username, o => o.MapFrom(s => s.Student.UserName))
        .ForMember(d => d.Image, o => o.MapFrom(s => s.Student.Photos.FirstOrDefault(p => p.IsMain).Url));
      CreateMap<User, Profiles.Profile>()
        .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));
    }
  }
}