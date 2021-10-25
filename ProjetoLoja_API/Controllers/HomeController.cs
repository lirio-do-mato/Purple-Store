using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjetoLoja_API.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using ProjetoLoja_API.Services;
using ProjetoLoja_API.Data;
namespace ProjetoLoja_API.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly LojaContext _context;
        public HomeController(LojaContext context)
        {
            // construtor
            _context = context;
        }
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] Usuario usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _context.Usuario
            .Where(u => u.Username == usuario.Username && u.Senha == usuario.Senha)
            .FirstOrDefault();
            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });
            var token = TokenService.GenerateToken(user);
            user.Senha = "";
            return new
            {
                user = user,
                token = token
            };
        }
    }
}