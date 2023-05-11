import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getPlayersOnATeam, getCaptainsOnATeam } from "../../Modules/userManager";
import { getTeam } from "../../Modules/teamManager"
import { getCurrentUserRole } from "../../Modules/roleManager";
import CaptainView from "./CaptainView";
import { me } from "../../Modules/authManager";
import { IsUserInLeague } from "../../Modules/userManager";
import { Table, Button } from "reactstrap";
import "./TeamDetails.css";


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
            <h1 className="team-name">{team.name}</h1>
            <h6 className="team-details">{team.details}</h6>
            {userRole && userRole.id === 1 ? <CaptainView /> : null}
            <h5>Team Captain:</h5>
            <Table className="team-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {captains.map((captain) => (
                        <tr key={captain.id}>
                            <td>{captain.name}</td>
                            <td>{captain.email}</td>
                            <td>
                                <Link to={`/player/${captain.id}`}>
                                    <Button color="primary">View Details</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h5>Current Players:</h5>
            {players.length === 0 ? (
                <p>There are currently no players on this roster.</p>
            ) : (
                <Table className="team-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.email}</td>
                                <td>
                                    <Link to={`/player/${player.id}`}>
                                        <Button color="primary">View Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <h5>Accessibility: {team.public ? 'Public' : 'Private'}</h5>
            <h6>Private teams can still be viewed by other players, but only a captain can add players to the team.</h6>

            {userRole && userRole.id === 2 ? (
                <Link to={`/team/${id}/Remove/${currentUser.id}`}>
                    <Button color="primary">Leave Team</Button>
                </Link>
            ) : null}
            {!isPlayerInLeague && team.public ? (
                <Link to={`/team/${id}/AddToRoster/${currentUser.id}`}>
                    <Button color="primary">Join Team</Button>
                </Link>
            ) : null}
        </div>
    );

}

export default TeamDetails