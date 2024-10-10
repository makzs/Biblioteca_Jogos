namespace Biblioteca_Jogos.Repositories;

public interface IUnitOfWork
{

    IGeneroRepository GeneroRepository { get; }
    IJogoRepository JogoRepository { get; }
    Task commitAsync();
}
