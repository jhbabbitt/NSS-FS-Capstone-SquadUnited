using SquadUnited.Models;
using System.Collections.Generic;

namespace SquadUnited.Repositories
{
    public interface ITeamRepository
    {
        List<Team> GetAllActiveTeams();
        List<Team> GetTeamsByUserId(int Id);
        Team GetTeamById(int Id);
        void UpdateTeam (Team team);
        List<Team> GetAllTeamsByLeague(int leagueId);
        int CreateTeam (Team team);
    }
}