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
        public RoleController(IRoleRepository rolerepository, IUserRepository userRepository)
        {
            _roleRepository = rolerepository;
            _userRepository = userRepository;
        }

        [HttpGet("CurrentUserRole")]
        public ActionResult<Role> GetCurrentUserRole(string firebaseUserId, int teamId)
        {
            User user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }

            Role role = _roleRepository.GetUserTeamRole(user.Id, teamId);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

    }
}
