using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.Models;

namespace Biblioteca_Jogos.Repositories;

public class JogoRepository : Repository<Jogo>, IJogoRepository
{
    public JogoRepository(AppDbContext context) : base(context)
    {
    }
}
