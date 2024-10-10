using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.Models;
using Biblioteca_Jogos.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca_Jogos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JogosController : ControllerBase
{
    // aplicando injeção de dependencia
    private readonly IUnitOfWork _uofw;

    public JogosController(IUnitOfWork uofw)
    {
        _uofw = uofw;
    }

    // Endpoints

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Jogo>>> Get()
    {
        var jogos = await _uofw.JogoRepository.GetAllAsync();

        if (!jogos.Any())
            return NotFound("Não existem jogos Registrados");

        return Ok(jogos);
    }

    [HttpGet("{id:int}", Name = "ObterJogo")]
    public async Task<ActionResult<Jogo>> Get(int id)
    {
        var jogo = await _uofw.JogoRepository.GetAsync(j => j.JogoId == id);

        if (jogo is null)
            return NotFound("Jogo não encontrado");

        return Ok(jogo);
    }

    [HttpPost]
    public async Task<ActionResult> Post(Jogo jogo)
    {
        if (jogo is null)
            return BadRequest("Jogo Invalido");

        _uofw.JogoRepository.Create(jogo);
        await _uofw.commitAsync();

        return new CreatedAtRouteResult("ObterJogo",
            new { id = jogo.JogoId }, jogo);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, Jogo jogo)
    {
        if (id != jogo.JogoId)
            return BadRequest("Id invalido");

        _uofw.JogoRepository.Update(jogo);
        await _uofw.commitAsync();

        return Ok(jogo);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var jogo = await _uofw.JogoRepository.GetAsync(j => j.JogoId == id);

        if (jogo is null)
            return NotFound("Jogo não encontrado");

        _uofw.JogoRepository.Delete(jogo);
        await _uofw.commitAsync();

        return Ok("Jogo removido com sucesso");
    }
}
