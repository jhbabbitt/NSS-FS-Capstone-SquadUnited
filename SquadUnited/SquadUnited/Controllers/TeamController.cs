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
        private readonly IUserRepository _userRepository;

        public TeamController(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
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
    }
}
