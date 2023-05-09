using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using SquadUnited.Models;
using SquadUnited.Repositories;
using System.Collections.Generic;

namespace SquadUnited.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var currentUser = GetCurrentUser();
            return Ok(_userRepository.GetUsers());
        }

        [HttpGet("GetPlayersOnATeam")]
        public IActionResult GetPlayersOnATeam(int teamId)
        {
            List<User> players = _userRepository.GetPlayersOnATeam(teamId);
            return Ok(players);
        }

        [HttpGet("GetCaptainsOnATeam")]
        public IActionResult GetCaptainsOnATeam(int teamId)
        {
            List<User> players = _userRepository.GetCaptainsOnATeam(teamId);
            if (players == null)
            {
                return NotFound();
            }
            return Ok(players);
        }

        [HttpGet("GetAvailablePlayers")]
        public IActionResult GetAvailablePlayers(int LeagueId)
        {
            List<User> players = _userRepository.GetAvailablePlayers(LeagueId);
            return Ok(players);
        }

        [HttpGet("details/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, User user)
        {
            var currentUser = GetCurrentUser();
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(user);
            return NoContent();

        }

        [HttpGet("userLeague/{leagueId}/{userId}")]
        public IActionResult IsUserInLeague(int leagueId, int userId)
        {
            bool isUserInLeague = _userRepository.IsUserInLeague(userId, leagueId);

            return Ok(isUserInLeague);
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpDelete("team/{teamId}/player/{userId}")]
        public IActionResult RemovefromTeam(int userId, int teamId)
        {
            _userRepository.DeleteUserTeam(userId, teamId);
            return NoContent();
        }
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}