using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SquadUnited.Models;
using SquadUnited.Utils;
using System.Collections.Generic;

namespace SquadUnited.Repositories
{
    public class TeamRepository : BaseRepository, ITeamRepository
    {
        public TeamRepository(IConfiguration configuration) : base(configuration) { }

        public List<Team> GetAllActiveTeams()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.Id, t.Name AS TeamName, t.Details,
                                                t.LeagueId, t.IsActive, t.[Public],
                                                L.Name AS LeagueName, L.Description, L.StartDate, L.EndDate
                                        FROM Team t
                                                LEFT JOIN League L on L.Id = t.LeagueId
                                        WHERE t.IsActive = 1";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var teams = new List<Team>();
                        while (reader.Read())
                        {
                            teams.Add(new Team()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "TeamName"),
                                Details = DbUtils.GetString(reader, "Details"),
                                LeagueId = DbUtils.GetInt(reader, "LeagueId"),
                                League = new League()
                                {
                                    Id = DbUtils.GetInt(reader, "LeagueId"),
                                    Name = DbUtils.GetString(reader, "LeagueName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                    EndDate = DbUtils.GetDateTime(reader, "EndDate")
                                },
                                IsActive = DbUtils.GetBool(reader, "IsActive"),
                                Public = DbUtils.GetBool(reader, "Public")
                            });
                        }
                        return teams;
                    }
                }
            }
        }

        public List<Team> GetTeamsByUserId(int Id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.Id, t.Name AS TeamName, t.Details,
                                                t.LeagueId, t.IsActive, t.[Public],
                                                L.Name AS LeagueName, L.Description, L.StartDate, L.EndDate
                                        FROM Team t
                                                LEFT JOIN League L on L.Id = t.LeagueId
                                                LEFT JOIN UserTeam ut on t.Id = ut.TeamId
                                        WHERE t.IsActive = 1 AND ut.UserId = @id";
                    cmd.Parameters.AddWithValue("@id", Id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var teams = new List<Team>();
                        while (reader.Read())
                        {
                            teams.Add(new Team()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "TeamName"),
                                Details = DbUtils.GetString(reader, "Details"),
                                LeagueId = DbUtils.GetInt(reader, "LeagueId"),
                                League = new League()
                                {
                                    Id = DbUtils.GetInt(reader, "LeagueId"),
                                    Name = DbUtils.GetString(reader, "LeagueName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                    EndDate = DbUtils.GetDateTime(reader, "EndDate")
                                },
                                IsActive = DbUtils.GetBool(reader, "IsActive"),
                                Public = DbUtils.GetBool(reader, "Public")
                            });
                        }
                        return teams;
                    }
                }
            }
        }

        public Team GetTeamById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.Name AS TeamName, t.Details,
                                                t.LeagueId, t.IsActive, t.[Public],
                                                L.Name AS LeagueName, L.Description, L.StartDate, L.EndDate
                                        FROM Team t
                                                LEFT JOIN League L on L.Id = t.LeagueId
                                        WHERE t.IsActive = 1 AND t.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Team team = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        team = new Team()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "TeamName"),
                            Details = DbUtils.GetString(reader, "Details"),
                            LeagueId = DbUtils.GetInt(reader, "LeagueId"),
                            League = new League()
                            {
                                Id = DbUtils.GetInt(reader, "LeagueId"),
                                Name = DbUtils.GetString(reader, "LeagueName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                EndDate = DbUtils.GetDateTime(reader, "EndDate")
                            },
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            Public = DbUtils.GetBool(reader, "Public")
                        };
                    }
                    reader.Close();

                    return team;
                }
            }
        }

        public List<Team> GetAllTeamsByLeague(int leagueId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.Id, t.Name AS TeamName, t.Details,
                                                t.LeagueId, t.IsActive, t.[Public],
                                                L.Name AS LeagueName, L.Description, L.StartDate, L.EndDate
                                        FROM Team t
                                                LEFT JOIN League L on L.Id = t.LeagueId
                                        WHERE t.IsActive = 1 AND L.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", leagueId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var teams = new List<Team>();
                        while (reader.Read())
                        {
                            teams.Add(new Team()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "TeamName"),
                                Details = DbUtils.GetString(reader, "Details"),
                                LeagueId = DbUtils.GetInt(reader, "LeagueId"),
                                League = new League()
                                {
                                    Id = DbUtils.GetInt(reader, "LeagueId"),
                                    Name = DbUtils.GetString(reader, "LeagueName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                    EndDate = DbUtils.GetDateTime(reader, "EndDate")
                                },
                                IsActive = DbUtils.GetBool(reader, "IsActive"),
                                Public = DbUtils.GetBool(reader, "Public")
                            });
                        }
                        return teams;
                    }
                }
            }
        }
        public void UpdateTeam(Team team)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Team
                SET [Name] = @name,
                    Details = @details,
                    [Public] = @isPublic
                WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", team.Name);
                    cmd.Parameters.AddWithValue("@details", team.Details);
                    cmd.Parameters.AddWithValue("@isPublic", team.Public);
                    cmd.Parameters.AddWithValue("@id", team.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public int CreateTeam(Team team)
        {
            int newId;
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Team ([Name], Details, [Public], LeagueId, IsActive)
                OUTPUT INSERTED.ID
                VALUES (@name, @details, @isPublic, @leagueId, 1)";

                    cmd.Parameters.AddWithValue("@name", team.Name);
                    cmd.Parameters.AddWithValue("@details", team.Details);
                    cmd.Parameters.AddWithValue("@isPublic", team.Public);
                    cmd.Parameters.AddWithValue("@leagueId", team.LeagueId);

                    newId = (int)cmd.ExecuteScalar();
                }
            }
            return newId;
        }

    }
}
