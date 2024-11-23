using System.ComponentModel.DataAnnotations;

namespace Biblioteca_Jogos.DTOs
{
    public class JogoDTO
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
        public int GeneroId { get; set; }
    }
}
