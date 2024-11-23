using AutoMapper;
using Biblioteca_Jogos.Models;

namespace Biblioteca_Jogos.DTOs.Mapping

{
    public class GeneroDTOMappingProfile : Profile
    {
        public GeneroDTOMappingProfile()
        {
            CreateMap<Genero, GeneroDTO>().ReverseMap();
            CreateMap<Jogo, JogoDTO>().ReverseMap();
        }
    }
}
