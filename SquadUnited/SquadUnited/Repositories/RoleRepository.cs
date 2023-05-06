using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SquadUnited.Models;
using SquadUnited.Utils;
using System.Collections.Generic;

namespace SquadUnited.Repositories
{
    public class RoleRepository : BaseRepository, IRoleRepository
    {
        public RoleRepository(IConfiguration configuration) : base(configuration) { }
        public Role GetUserTeamRole(int UserId, int TeamId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Name,
                                ut.Id AS UserTeamId, ut.UserId AS UserId, ut.TeamId AS TeamId
                          FROM Role r
                        LEFT JOIN UserTeam ut ON ut.RoleId = r.Id
                         WHERE ut.UserId = @UserId AND ut.TeamId = @TeamId";

                    DbUtils.AddParameter(cmd, "@Userid", UserId);
                    DbUtils.AddParameter(cmd, "@Teamid", TeamId);
                    Role role = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        role = new Role()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }
                    reader.Close();

                    return role;
                }
            }
        }
    }
}
