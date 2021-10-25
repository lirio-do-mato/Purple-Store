using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjetoLoja_API.Data;
using ProjetoLoja_API.Models;

namespace ProjetoLoja_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly LojaContext _context;
        public UsuarioController(LojaContext context)
        {
            _context = context;
        }

        public ActionResult<List<Usuario>> GetAll()
        {
            return _context.Usuario.ToList();
        }

        [HttpGet("{UsuarioId}")]
        public ActionResult<List<Usuario>> Get(int UsuarioId)
        {
            try
            {
                var result = _context.Usuario.Find(UsuarioId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Usuario model)
        {
            try
            {
                _context.Usuario.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    return Created($"/api/usuario/{model.Username}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
        }

        [HttpDelete("{UsuarioId}")]
        public async Task<ActionResult> delete(int UsuarioId)
        {
            try
            {
                var usuario = await _context.Usuario.FindAsync(UsuarioId);
                if (usuario == null)
                {
                    return NotFound();
                }
                _context.Remove(usuario);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{UsuarioId}")]
        public async Task<IActionResult> put(int UsuarioId, Usuario dadosUsuarioAlt)
        {
            try
            {
                var result = await _context.Usuario.FindAsync(UsuarioId);
                if (UsuarioId != result.Id)
                {
                    return BadRequest();
                }
                result.Username = dadosUsuarioAlt.Username;
                result.Senha = dadosUsuarioAlt.Senha;
                result.Role = dadosUsuarioAlt.Role;
                await _context.SaveChangesAsync();
                return Created($"/api/usuario/{dadosUsuarioAlt.Username}", dadosUsuarioAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    }
}