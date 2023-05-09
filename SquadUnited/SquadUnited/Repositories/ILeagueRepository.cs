using SquadUnited.Models;
using System.Collections.Generic;

namespace SquadUnited.Repositories
{
    public interface ILeagueRepository
    {
        List<League> GetAllActiveLeagues();
    }
}