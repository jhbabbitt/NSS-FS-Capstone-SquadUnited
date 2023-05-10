using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using SquadUnited.Models;
using SquadUnited.Utils;
using Microsoft.Data.SqlClient;

namespace SquadUnited.Repositories
{
    public class LeagueRepository : BaseRepository, ILeagueRepository
    {
        public LeagueRepository(IConfiguration configuration) : base(configuration) { }

        public List<League> GetAllActiveLeagues()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT L.Id AS LeagueId, L.Name AS LeagueName, L.Description, L.StartDate, L.EndDate
                                        FROM League L
                                        WHERE L.EndDate > GETDATE()
                                        ORDER BY L.StartDate ASC";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var leagues = new List<League>();
                        while (reader.Read())
                        {
                            leagues.Add(new League()
                            {
                                Id = DbUtils.GetInt(reader, "LeagueId"),
                                Name = DbUtils.GetString(reader, "LeagueName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                EndDate = DbUtils.GetDateTime(reader, "EndDate")
                            });
                        }
                        return leagues;
                    }
                }
            }
        }

        public League GetLeagueById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT L.Id, L.Name AS LeagueName, L.Description, L.StartDate, L.EndDate
                                        FROM League L
                                        WHERE L.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    League league = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        league = new League()
                        {
                            
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "LeagueName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                EndDate = DbUtils.GetDateTime(reader, "EndDate")
                            
                        };
                    }
                    reader.Close();

                    return league;
                }
            }
        }
    }
}
