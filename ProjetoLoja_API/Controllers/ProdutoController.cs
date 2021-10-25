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
    public class ProdutoController: Controller
    {
        private readonly LojaContext _context;
        public ProdutoController(LojaContext context)
        {
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Produto>> GetAll()
        {
            return _context.Produto.ToList();
        }

        [HttpGet("{ProdutoId}")]
        public ActionResult<List<Produto>> Get(int ProdutoId)
        {
            try
            {
                var result = _context.Produto.Find(ProdutoId);
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
        public async Task<ActionResult> post(Produto model)
        {
            try
            {
                _context.Produto.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    return Created($"/api/produto/{model.Nome}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
        }

        [HttpDelete("{ProdutoId}")]
        public async Task<ActionResult> delete(int ProdutoId)
        {
            try
            {
                var produto = await _context.Produto.FindAsync(ProdutoId);
                if (produto == null)
                {
                    return NotFound();
                }
                _context.Remove(produto);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{ProdutoId}")]
        public async Task<IActionResult> put(int ProdutoId, Produto dadosProdutoAlt)
        {
            try
            {
                var result = await _context.Produto.FindAsync(ProdutoId);
                if (ProdutoId != result.Id)
                {
                    return BadRequest();
                }
                result.Nome = dadosProdutoAlt.Nome;
                result.Imagem = dadosProdutoAlt.Imagem;
                result.Preco = dadosProdutoAlt.Preco;
                result.Descricao = dadosProdutoAlt.Descricao;
                result.Quantidade = dadosProdutoAlt.Quantidade;
                await _context.SaveChangesAsync();
                return Created($"/api/produto/{dadosProdutoAlt.Nome}", dadosProdutoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    }
}