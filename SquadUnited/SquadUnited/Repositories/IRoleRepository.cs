using SquadUnited.Models;

namespace SquadUnited.Repositories
{
    public interface IRoleRepository
    {
        Role GetUserTeamRole(int UserId, int TeamId);
    }
}