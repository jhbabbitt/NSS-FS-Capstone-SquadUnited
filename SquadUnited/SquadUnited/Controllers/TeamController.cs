using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SquadUnited.Repositories;
using System.Collections.Generic;
using SquadUnited.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace SquadUnited.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;

        public TeamController(ITeamRepository teamRepository, IUserRepository userRepository)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_teamRepository.GetAllActiveTeams());
        }

        [HttpGet("GetTeamsByCurrentUser")]
        public IActionResult GetTeamsByCurrentUser(string firebaseUserId)
        {
            User user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            List<Team> teams = _teamRepository.GetTeamsByUserId(user.Id);
            if (teams == null)
            {
                return NotFound();
            }
            return Ok(teams);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var team = _teamRepository.GetTeamById(id);
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }

            _teamRepository.UpdateTeam(team);
            return NoContent();
        }

        [HttpPost("addPlayer")]
        public IActionResult AddPlayerToTeam([FromBody] UserTeam userTeam)
        {
            try
            {
                _userRepository.AddPlayerToTeam(userTeam);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
