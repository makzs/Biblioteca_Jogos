using System.ComponentModel.DataAnnotations;

namespace Biblioteca_Jogos.DTOs
{
    public class GeneroDTO
    {
        [Key]
        public int GeneroId { get; set; }
        [Required]
        public string? Nome { get; set; }
        [Required]
        public string? Descricao { get; set; }
        [Required]
        public string? ImagemUrl { get; set; }
    }
}
