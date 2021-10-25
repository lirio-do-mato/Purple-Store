using Microsoft.EntityFrameworkCore;
using ProjetoLoja_API.Models;
namespace ProjetoLoja_API.Data
    {
    public class LojaContext: DbContext
    {
        public LojaContext(DbContextOptions<LojaContext> options): base (options)
        {

        }
        public DbSet<Produto> Produto {get; set;}
        public DbSet<Usuario> Usuario {get; set;}
    }
}