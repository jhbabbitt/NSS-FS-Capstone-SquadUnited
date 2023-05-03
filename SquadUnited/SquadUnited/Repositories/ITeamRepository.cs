using SquadUnited.Models;
using System.Collections.Generic;

namespace SquadUnited.Repositories
{
    public interface ITeamRepository
    {
        List<Team> GetAllActiveTeams();
        List<Team> GetTeamsByUserId(int Id);
    }
}