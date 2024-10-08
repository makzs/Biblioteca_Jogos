using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca_Jogos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerosController : ControllerBase
    {
        // aplicando injeção de dependencia do contexto do banco de dados
        private readonly AppDbContext _context;

        public GenerosController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoints

        [HttpGet]
        public ActionResult<IEnumerable<Genero>> Get()
        {
            var generos = _context.Generos.AsNoTracking().Take(10).ToList();

            if (!generos.Any())
                return NotFound("Não existem Generos Registrados");

            return Ok(generos);
        }

        [HttpGet("{id:int}", Name ="ObterGenero")]
        public ActionResult<Genero> Get(int id)
        {
            var genero = _context.Generos.AsNoTracking().FirstOrDefault(g => g.GeneroId == id);

            if (genero is null)
                return NotFound("Genero não encontrado");

            return Ok(genero);
        }

        [HttpPost]
        public ActionResult Post(Genero genero)
        {
            if (genero is null)
                return BadRequest("Genero Invalido");

            _context.Generos.Add(genero);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterGenero",
                new { id = genero.GeneroId }, genero);
        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Genero genero)
        {
            if (id != genero.GeneroId)
                return BadRequest("Id invalido");

            _context.Entry(genero).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(genero);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var genero = _context.Generos.FirstOrDefault(g => g.GeneroId==id);

            if (genero is null)
                return NotFound("Genero não encontrado");

            _context.Generos.Remove(genero);
            _context.SaveChanges();

            return Ok("Genero removido com sucesso");
        }
    }
}
