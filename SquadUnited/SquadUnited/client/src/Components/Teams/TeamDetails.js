import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getPlayersOnATeam, getCaptainsOnATeam } from "../../Modules/userManager";
import { getTeam } from "../../Modules/teamManager"
import { getCurrentUserRole } from "../../Modules/roleManager";
import CaptainView from "./CaptainView";
import { me } from "../../Modules/authManager";
import { IsUserInLeague } from "../../Modules/userManager";


const TeamDetails = () => {
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null)
    const [team, setTeam] = useState({});
    const [players, setPlayers] = useState([]);
    const [captains, setCaptains] = useState([]);
    const [userRole, setUserRole] = useState({});
    const [isPlayerInLeague, setIsPlayerInLeague] = useState(false);

    useEffect(() => {
        const promises = [me(), getTeam(id), getPlayersOnATeam(id), getCaptainsOnATeam(id), getCurrentUserRole(id)];

        Promise.all(promises)
            .then(([meData, teamData, playersData, captainsData, userRoleData]) => {
                setCurrentUser(meData);
                setTeam(teamData);
                setPlayers(playersData);
                setCaptains(captainsData);
                setUserRole(userRoleData);

                if (teamData) {
                    IsUserInLeague(teamData.leagueId, meData.id)
                        .then((isPlayerInLeagueData) => {
                            setIsPlayerInLeague(isPlayerInLeagueData);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);



    return (
        <div className="container">
            <h2>{team.name}</h2>
            <h6>{team.details}</h6>
            {userRole && userRole.id === 1 ? <CaptainView /> : null}
            <h5>Team Captain:</h5>
            <div className="row justify-content-center">
                {captains.map((captain) => (
                    <div key={captain.id}>
                        <p>{captain.name}</p>
                        <p>{captain.email}</p>
                        <button>View Details</button>
                    </div>
                ))}
            </div>
            <h5>Current Players:</h5>
            {players.length === 0 ? (
                <p>There are currently no players on this roster.</p>
            ) : (
                <div className="row justify-content-center">
                    {players.map((player) => (
                        <div key={player.id}>
                            <p>{player.name}</p>
                            <p>{player.email}</p>
                            <button>View Details</button>
                        </div>
                    ))}
                </div>
            )}
            <h5>Accessibility: {team.public ? 'Public' : 'Private'}</h5>
            <h6>Private teams can still be viewed by other players, but only a captain can add players to the team.</h6>

            {userRole && userRole.id === 2 ?
                <Link to={`/team/${id}/Remove/${currentUser.id}`}>
                    <button>Leave Team</button>
                </Link> : null}
            {!isPlayerInLeague && team.public ? (
                <Link to={`/team/${id}/AddToRoster/${currentUser.id}`}>
                    <button>Join Team</button>
                </Link>
            ) : null}
        </div>
    );
}

export default TeamDetails