using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca_Jogos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogosController : ControllerBase
    {
        // aplicando injeção de dependencia do contexto do banco de dados
        private readonly AppDbContext _context;

        public JogosController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoints

        [HttpGet]
        public ActionResult<IEnumerable<Jogo>> Get()
        {
            var jogos = _context.Jogos.AsNoTracking().Take(10).ToList();

            if (!jogos.Any())
                return NotFound("Não existem jogos Registrados");

            return Ok(jogos);
        }

        [HttpGet("{id:int}", Name = "ObterJogo")]
        public ActionResult<Jogo> Get(int id)
        {
            var jogo = _context.Jogos.AsNoTracking().FirstOrDefault(g => g.JogoId == id);

            if (jogo is null)
                return NotFound("Jogo não encontrado");

            return Ok(jogo);
        }

        [HttpPost]
        public ActionResult Post(Jogo jogo)
        {
            if (jogo is null)
                return BadRequest("Jogo Invalido");

            _context.Jogos.Add(jogo);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterJogo",
                new { id = jogo.JogoId }, jogo);
        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Jogo jogo)
        {
            if (id != jogo.JogoId)
                return BadRequest("Id invalido");

            _context.Entry(jogo).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(jogo);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var jogo = _context.Jogos.FirstOrDefault(g => g.JogoId == id);

            if (jogo is null)
                return NotFound("Jogo não encontrado");

            _context.Jogos.Remove(jogo);
            _context.SaveChanges();

            return Ok("Jogo removido com sucesso");
        }
    }
}
