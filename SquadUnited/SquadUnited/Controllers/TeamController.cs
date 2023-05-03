using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SquadUnited.Repositories;
using System.Collections.Generic;
using SquadUnited.Models;
using Microsoft.Extensions.Hosting;

namespace SquadUnited.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;

        public TeamController(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_teamRepository.GetAllActiveTeams());
        }

        [HttpGet("GetUserTeams/{id}")]
        public IActionResult GetTeamsByUser(int Id) 
        {
            List<Team> teams = _teamRepository.GetTeamsByUserId(Id);
            if (teams == null)
            {
                return NotFound();
            }
            return Ok(teams);
        }
    }
}
