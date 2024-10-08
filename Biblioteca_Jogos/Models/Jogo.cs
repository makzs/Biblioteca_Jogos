using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Biblioteca_Jogos.Models;

public class Jogo
{
    [Key]
    public int JogoId { get; set; }
    [Required]
    public string? Titulo { get; set; } 
    [Required]
    public string? Plataformas { get; set; }
    [Required]
    public int Ano { get; set; }
    [Required]
    public decimal Preco { get; set; }
    [Required]
    public string? ImagemUrl { get; set; }
    public DateTime DataCadastrado { get; set; }

    public int GeneroId { get; set; }
    [JsonIgnore]
    public Genero? Genero { get; set; }
}
