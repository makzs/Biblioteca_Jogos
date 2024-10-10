using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.Models;
using Biblioteca_Jogos.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca_Jogos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GenerosController : ControllerBase
{
    // aplicando injeção de dependencia
    private readonly IUnitOfWork _uofw;

    public GenerosController(IUnitOfWork uofw)
    {
        _uofw = uofw;
    }

    // Endpoints

    [HttpGet]
    public ActionResult<IEnumerable<Genero>> Get()
    {
        var generos = _uofw.GeneroRepository.GetAll();

        if (!generos.Any())
            return NotFound("Não existem Generos Registrados");

        return Ok(generos);
    }

    [HttpGet("{id:int}", Name ="ObterGenero")]
    public ActionResult<Genero> Get(int id)
    {
        var genero = _uofw.GeneroRepository.Get(g => g.GeneroId == id);

        if (genero is null)
            return NotFound("Genero não encontrado");

        return Ok(genero);
    }

    [HttpPost]
    public ActionResult Post(Genero genero)
    {
        if (genero is null)
            return BadRequest("Genero Invalido");

        _uofw.GeneroRepository.Create(genero);

        return new CreatedAtRouteResult("ObterGenero",
            new { id = genero.GeneroId }, genero);
    }

    [HttpPut("{id:int}")]
    public ActionResult Put(int id, Genero genero)
    {
        if (id != genero.GeneroId)
            return BadRequest("Id invalido");

        _uofw.GeneroRepository.Update(genero);

        return Ok(genero);
    }

    [HttpDelete("{id:int}")]
    public ActionResult Delete(int id)
    {
        var genero = _uofw.GeneroRepository.Get(g => g.GeneroId == id);

        if (genero is null)
            return NotFound("Genero não encontrado");

        _uofw.GeneroRepository.Delete(genero);

        return Ok("Genero removido com sucesso");
    }
}
