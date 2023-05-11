import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeam } from "../../Modules/teamManager"
import { Link } from "react-router-dom";
import { getCurrentUserRole } from "../../Modules/roleManager";
import { getAvailablePlayers } from "../../Modules/userManager";
import { Table, Button } from 'reactstrap';
import "./HorizButtons.css";

export const AvailablePlayerList = () => {
    const [team, setTeam] = useState();
    const [players, setPlayers] = useState([])
    const [userRole, setUserRole] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getTeam(id).then(setTeam);
        getCurrentUserRole(id).then(setUserRole);
    }, []);

    useEffect(() => {
        if (team && team.leagueId) {
            getAvailablePlayers(team.leagueId).then((data) => setPlayers(data));
        }
    }, [team]);

    return (
        <div className="container">
            {userRole && userRole.id === 1 ? (
                <>
                    <h2>Available players for {team.league.name}</h2>
                    <h5>Players that are currently on a team in this league are not permitted to join another team, and have been filtered.</h5>
                    {players.length === 0 ? (
                        <p>There are currently no players available for this league.</p>
                    ) : (
                        <Table className="table">
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
                                            <Link to={`/team/${id}/AddToRoster/${player.id}`}>
                                                <Button color="primary">Add to Roster</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    <Link to={`/team/${id}`}>
                        <Button color="primary">Done</Button>
                    </Link>
                </>
            ) : (
                <p>Only the captain of this team can manage this roster.</p>
            )}
        </div>
    );
}