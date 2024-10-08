﻿using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Biblioteca_Jogos.Models;

public class Genero
{
    public Genero()
    {
        Jogos = new Collection<Jogo>();
    }

    [Key]
    public int GeneroId { get; set; }
    [Required]
    public string? Nome { get; set; }
    [Required]
    public string? Descricao { get; set; }
    [Required]
    public string? ImagemUrl { get; set; }
    public ICollection<Jogo>? Jogos { get; set; }
}
