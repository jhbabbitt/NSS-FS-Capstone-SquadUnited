using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SquadUnited.Models;
using SquadUnited.Repositories;

namespace SquadUnited.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IUserRepository _userRepository;
        private readonly ITeamRepository _teamRepository;

        public RoleController(IRoleRepository rolerepository, ITeamRepository teamRepository, IUserRepository userRepository)
        {
            _roleRepository = rolerepository;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
        }

        [HttpGet("CurrentUserRole")]
        public IActionResult GetCurrentUserRole(string firebaseUserId, int teamId)
        {
            User user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            Role role = _roleRepository.GetUserTeamRole(user.Id, teamId);
            return Ok(role);
        }
    }
}
