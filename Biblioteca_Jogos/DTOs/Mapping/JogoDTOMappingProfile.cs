using AutoMapper;
using Biblioteca_Jogos.Models;

namespace Biblioteca_Jogos.DTOs.Mapping
{
    public class JogoDTOMappingProfile : Profile
    {
        public JogoDTOMappingProfile()
        {
            CreateMap<Jogo, JogoDTO>().ReverseMap();
            CreateMap<Genero, GeneroDTO>().ReverseMap();
        }
    }
}
