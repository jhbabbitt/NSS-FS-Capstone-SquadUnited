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
    public class LeagueController : ControllerBase
    {
        private readonly ILeagueRepository _leagueRepository;
        private readonly IUserRepository _userRepository;
        public LeagueController(ILeagueRepository leaguerepository, IUserRepository userRepository)
        {
            _leagueRepository = leaguerepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_leagueRepository.GetAllActiveLeagues());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var league = _leagueRepository.GetLeagueById(id);
            if (league == null)
            {
                return NotFound();
            }
            return Ok(league);
        }
    }
}
