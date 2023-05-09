using SquadUnited.Models;
using System.Collections.Generic;

namespace SquadUnited.Repositories
{
    public interface IUserRepository
    {
        void Add(User userProfile);
        User GetByFirebaseUserId(string firebaseUserId);
        User GetById(int id);
        List<User> GetUsers();
        List<User> GetPlayersOnATeam(int teamId);
        List<User> GetCaptainsOnATeam(int teamId);
        void Update(User userProfile);
        void DeleteUserTeam (int userId, int teamId);
        List<User> GetAvailablePlayers(int id);
        void AddPlayerToTeam(UserTeam userTeam);
    }
}