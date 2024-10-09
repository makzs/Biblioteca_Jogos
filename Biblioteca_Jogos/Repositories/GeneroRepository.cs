using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.Models;

namespace Biblioteca_Jogos.Repositories;

public class GeneroRepository : Repository<Genero>, IGeneroRepository
{
    public GeneroRepository(AppDbContext context) : base(context)
    {
    }
}
