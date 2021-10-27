using AutoMapper;
using Domain;
using Domain.DTOs;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Post, Post>();
            CreateMap<Post, OutboundPostDto>()
                .ForMember(dest => dest.TypeString, opt => opt.MapFrom(
                    src => src.Type.GetDescription()
                ));
        }
    }
}