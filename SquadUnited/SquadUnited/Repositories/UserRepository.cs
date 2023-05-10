using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using SquadUnited.Models;
using SquadUnited.Utils;

namespace SquadUnited.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.Name, 
                               up.Email, up.IsActive
                          FROM [User] up
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.Name, 
                               up.Email, up.IsActive
                          FROM [User] up
                         WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public List<User> GetUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, Up.FirebaseUserId, up.Name, 
                                                up.Email, up.IsActive
                                        FROM [User] up";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                IsActive = DbUtils.GetBool(reader, "IsActive"),
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public List<User> GetPlayersOnATeam(int teamId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id AS UserId, Up.FirebaseUserId, up.Name, 
                                                up.Email, up.IsActive AS ActiveProfile,
                                                t.Id AS TeamId, t.IsActive AS ActiveTeam,
                                                ut.Id, ut.RoleId
                                        FROM [User] up
                                        LEFT JOIN UserTeam ut on ut.UserId = up.Id
                                        LEFT JOIN Team t on t.Id = ut.TeamId
                                        WHERE t.IsActive = 1 AND up.IsActive = 1 AND ut.RoleId = 2 AND ut.TeamId = @id";
                    cmd.Parameters.AddWithValue("@id", teamId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                IsActive = DbUtils.GetBool(reader, "ActiveProfile"),
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public List<User> GetCaptainsOnATeam(int teamId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id AS UserId, Up.FirebaseUserId, up.Name, 
                                                up.Email, up.IsActive AS ActiveProfile,
                                                t.Id AS TeamId, t.IsActive AS ActiveTeam,
                                                ut.Id, ut.RoleId
                                        FROM [User] up
                                        LEFT JOIN UserTeam ut on ut.UserId = up.Id
                                        LEFT JOIN Team t on t.Id = ut.TeamId
                                        WHERE t.IsActive = 1 AND up.IsActive = 1 AND ut.RoleId = 1 AND ut.TeamId = @id";
                    cmd.Parameters.AddWithValue("@id", teamId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                IsActive = DbUtils.GetBool(reader, "ActiveProfile"),
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public List<User> GetAvailablePlayers(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id AS UserId, u.FirebaseUserId, u.Name, u.Email, u.IsActive AS ActiveProfile
                                        FROM [User] u
                                        WHERE NOT EXISTS (
                                            SELECT *
                                            FROM UserTeam ut
                                            INNER JOIN Team t ON ut.TeamId = t.Id
                                            INNER JOIN League l ON t.LeagueId = l.Id
                                            WHERE ut.UserId = u.Id
                                            AND t.LeagueId = @id
                                        )";
                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                IsActive = DbUtils.GetBool(reader, "ActiveProfile"),
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FirebaseUserId, Name, 
                                                                 Email, IsActive)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, 
                                                @Email, @IsActive)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);

                    user.Id = (int)cmd.ExecuteScalar();
                    user.IsActive = true;
                }
            }
        }


        public void AddPlayerToTeam(UserTeam userTeam)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserTeam (UserId, TeamId, RoleId)
                                OUTPUT INSERTED.ID
                                VALUES (@UserId, @TeamId, 2)";
                    DbUtils.AddParameter(cmd, "@UserId", userTeam.UserId);
                    DbUtils.AddParameter(cmd, "@TeamId", userTeam.TeamId);
                    userTeam.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public UserTeam AddCaptainToTeam(int userId, int teamId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserTeam (UserId, TeamId, RoleId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @TeamId, 1)";
                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@TeamId", teamId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var userTeam = new UserTeam
                            {
                                Id = DbUtils.GetInt(reader, "ID"),
                                UserId = userId,
                                TeamId = teamId,
                                RoleId = 1
                            };

                            return userTeam;
                        }
                    }
                }
            }
            return null;
        }



        public bool IsUserInLeague(int userId, int leagueId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT COUNT(*) 
            FROM userTeam AS ut 
            JOIN team AS t ON ut.teamId = t.Id 
            WHERE ut.userId = @userId 
            AND t.leagueId = @leagueId
            ";
                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@leagueId", leagueId);
                    int count = (int)cmd.ExecuteScalar();
                    return count > 0;
                }
            }
        }


        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [User]
                                        SET
                                            Name = @Name,
                                            Email = @email,
                                            IsActive = @IsActive
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@IsActive", user.IsActive);
                    DbUtils.AddParameter(cmd, "@id", user.Id);
                    if (user.IsActive == true)
                    {
                        DbUtils.AddParameter(cmd, "@activated", 1);
                    }
                    else
                    {
                        DbUtils.AddParameter(cmd, "@activated", 0);
                    }

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUserTeam(int userId, int teamId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM UserTeam WHERE UserId = @UserId AND TeamId = @TeamId";
                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@TeamId", teamId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
