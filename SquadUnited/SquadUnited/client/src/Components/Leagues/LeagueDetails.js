import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCaptainsOnATeam } from "../../Modules/userManager";
import { GetTeamsByLeague } from "../../Modules/teamManager";
import { getLeague } from "../../Modules/leagueManager";
import { IsUserInLeague } from "../../Modules/userManager";
import { me } from "../../Modules/authManager";
import { Table } from "reactstrap";


const LeagueDetails = () => {
    const { id } = useParams();
    const [teams, setTeams] = useState([]);
    const [league, setLeague] = useState({});
    const [currentUser, setCurrentUser] = useState(null)
    const [isPlayerInLeague, setIsPlayerInLeague] = useState(false);

    useEffect(() => {
        GetTeamsByLeague(id).then((teams) => {
            const promises = teams.map((team) =>
                getCaptainsOnATeam(team.id).then((captains) => {
                    if (captains.length > 0) {
                        team.captain = captains[0];
                    }
                })
            );
            Promise.all(promises).then(() => setTeams(teams));
        });

        getLeague(id).then(setLeague);
    }, [id]);

    useEffect(() => {
        me().then((user) => {
            if (user) {
                IsUserInLeague(id, user.id).then((result) => setIsPlayerInLeague(result));
                setCurrentUser(user);
            }
        });
    }, [id]);


    return (
        <div className="container">
          <h2>{league.name}</h2>
          <h6>{league.description}</h6>
          <h6>Start Date: {new Date(league.startDate).toLocaleDateString('en-US')}</h6>
          <h6>End Date: {new Date(league.endDate).toLocaleDateString('en-US')}</h6>
      
          <h5>Teams:</h5>
          <Table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Team Captain</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.captain && team.captain.name}</td>
                  <td>
                    <Link to={`/team/${team.id}`}>
                      <button>View Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      
          {currentUser && !isPlayerInLeague && (
            <div className="row justify-content-center">
              <Link to={`/Leagues/${id}/CreateTeam`}>
                <button>Create Team</button>
              </Link>
            </div>
          )}
        </div>
      );
      
};

export default LeagueDetails;