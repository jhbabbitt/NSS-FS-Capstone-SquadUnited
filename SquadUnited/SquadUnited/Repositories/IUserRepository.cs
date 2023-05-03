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
        void Update(User userProfile);
    }
}