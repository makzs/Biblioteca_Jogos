using AutoMapper;
using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.DTOs;
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
    private readonly IMapper _mapper;

    public JogosController(IUnitOfWork uofw, IMapper mapper)
    {
        _uofw = uofw;
        _mapper = mapper;
    }

    // Endpoints

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JogoDTO>>> Get()
    {
        var jogos = await _uofw.JogoRepository.GetAllAsync();

        if (!jogos.Any())
            return NotFound("Não existem jogos Registrados");

        var jogosDTO = _mapper.Map<IEnumerable<JogoDTO>>(jogos);

        return Ok(jogosDTO);
    }

    [HttpGet("{id:int}", Name = "ObterJogo")]
    public async Task<ActionResult<JogoDTO>> Get(int id)
    {
        var jogo = await _uofw.JogoRepository.GetAsync(j => j.JogoId == id);

        if (jogo is null)
            return NotFound("Jogo não encontrado");

        var jogoDTO = _mapper.Map<JogoDTO>(jogo);

        return Ok(jogoDTO);
    }

    [HttpPost]
    public async Task<ActionResult<JogoDTO>> Post(JogoDTO jogoDto)
    {
        if (jogoDto is null)
            return BadRequest("Jogo Invalido");

        var jogo = _mapper.Map<Jogo>(jogoDto);

        _uofw.JogoRepository.Create(jogo);
        await _uofw.commitAsync();

        var NovoJogoDto = _mapper.Map<JogoDTO>(jogo);

        return new CreatedAtRouteResult("ObterJogo",
            new { id = NovoJogoDto.JogoId }, NovoJogoDto);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<JogoDTO>> Put(int id, JogoDTO jogoDto)
    {
        if (id != jogoDto.JogoId)
            return BadRequest("Id invalido");

        var jogo = _mapper.Map<Jogo>(jogoDto);

        var jogoAtualizado = _uofw.JogoRepository.Update(jogo);
        await _uofw.commitAsync();

        var jogoDtoAtualizado = _mapper.Map<JogoDTO>(jogoAtualizado);

        return Ok(jogoDtoAtualizado);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<JogoDTO>> Delete(int id)
    {
        var jogo = await _uofw.JogoRepository.GetAsync(j => j.JogoId == id);

        if (jogo is null)
            return NotFound("Jogo não encontrado");

        var jogoDeletado = _uofw.JogoRepository.Delete(jogo);
        await _uofw.commitAsync();

        var jogoDtoDeletado = _mapper.Map<JogoDTO>(jogoDeletado);

        return Ok(jogoDtoDeletado);
    }
}
