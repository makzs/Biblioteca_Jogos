using Biblioteca_Jogos.Models;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca_Jogos.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base( options )
        {
                           
        }

        public DbSet<Genero> Genero { get; set; }
        public DbSet<Jogo> Jogos { get; set; }
    }
}
