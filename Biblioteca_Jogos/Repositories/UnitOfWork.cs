using Biblioteca_Jogos.Context;

namespace Biblioteca_Jogos.Repositories;

public class UnitOfWork : IUnitOfWork
{

    private IGeneroRepository _generoRepo;
    private IJogoRepository _jogoRepo;

    public AppDbContext _context;
    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public IGeneroRepository GeneroRepository
    {
        get
        {
            return _generoRepo = _generoRepo ?? new GeneroRepository(_context);
        }
    }

    public IJogoRepository JogoRepository
    {
        get
        {
            return _jogoRepo = _jogoRepo ?? new JogoRepository(_context);
        }
    }

    public async Task commitAsync()
    {
        await _context.SaveChangesAsync();
    }
    public void Dispose()
    {

    }
}
