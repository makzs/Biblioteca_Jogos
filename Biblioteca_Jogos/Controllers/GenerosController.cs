using AutoMapper;
using Biblioteca_Jogos.Context;
using Biblioteca_Jogos.DTOs;
using Biblioteca_Jogos.Models;
using Biblioteca_Jogos.Repositories;
using Microsoft.AspNetCore.Authorization;
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
    private readonly IMapper _mapper;

    public GenerosController(IUnitOfWork uofw, IMapper mapper)
    {
        _uofw = uofw;
        _mapper = mapper;
    }

    // Endpoints

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GeneroDTO>>> Get()
    {
        var generos = await _uofw.GeneroRepository.GetAllAsync();

        if (!generos.Any())
            return NotFound("Não existem Generos Registrados");

        var generosDTO = _mapper.Map<IEnumerable<GeneroDTO>>(generos);

        return Ok(generosDTO);
    }

    [HttpGet("{id:int}", Name ="ObterGenero")]
    public async Task<ActionResult<GeneroDTO>> GetAction(int id)
    {
        var genero = await _uofw.GeneroRepository.GetAsync(g => g.GeneroId == id);

        if (genero is null)
            return NotFound("Genero não encontrado");

        var generoDTO = _mapper.Map<GeneroDTO>(genero);

        return Ok(generoDTO);
    }

    [HttpPost]
    public async Task<ActionResult<GeneroDTO>> Post(GeneroDTO generoDto)
    {
        if (generoDto is null)
            return BadRequest("Genero Invalido");

        var genero = _mapper.Map<Genero>(generoDto);

        _uofw.GeneroRepository.Create(genero);
        await _uofw.commitAsync();

        var NovoGeneroDto = _mapper.Map<GeneroDTO>(genero);

        return new CreatedAtRouteResult("ObterGenero",
            new { id = NovoGeneroDto.GeneroId }, NovoGeneroDto);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<GeneroDTO>> Put(int id, GeneroDTO generoDto)
    {
        if (id != generoDto.GeneroId)
            return BadRequest("Id invalido");

        var genero = _mapper.Map<Genero>(generoDto);

        var generoAtualizado = _uofw.GeneroRepository.Update(genero);
        await _uofw.commitAsync();

        var generoDtoAtualizado = _mapper.Map<GeneroDTO>(generoAtualizado);

        return Ok(generoDtoAtualizado);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<GeneroDTO>> Delete(int id)
    {
        var genero = await _uofw.GeneroRepository.GetAsync(g => g.GeneroId == id);

        if (genero is null)
            return NotFound("Genero não encontrado");

        var generoDeletado = _uofw.GeneroRepository.Delete(genero);
        await _uofw.commitAsync();

        var generoDtoDeletado = _mapper.Map<GeneroDTO>(generoDeletado);

        return Ok(generoDtoDeletado);
    }
}
