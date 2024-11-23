using System.ComponentModel.DataAnnotations;

namespace Biblioteca_Jogos.DTOs.AuthenticationDTOs
{
    public class RegisterModelDTO
    {
        [Required(ErrorMessage = "O nome é obrigatorio")]
        public string? UserName { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        [Required(ErrorMessage = "A senha é obrigatoria")]
        public string? Password { get; set; }
    }
}
