import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUserRole } from "../../Modules/roleManager";
import { getTeam } from "../../Modules/teamManager"
import { getPlayersOnATeam, getCaptainsOnATeam } from "../../Modules/userManager";
import { Link } from "react-router-dom";
import { Table, Button } from 'reactstrap';
import "./ManageRoster.css";

const ManageRoster = () => {
    const { id } = useParams();
    const [team, setTeam] = useState({});
    const [players, setPlayers] = useState([])
    const [captains, setCaptains] = useState([])
    const [userRole, setUserRole] = useState({});

    useEffect(() => {
        getTeam(id).then(setTeam);
        getPlayersOnATeam(id).then(setPlayers);
        getCaptainsOnATeam(id).then(setCaptains);
        getCurrentUserRole(id).then(setUserRole);
    }, [id]);

    return (
        <div className="container">
            {userRole && userRole.id === 1 ? (
                <>
                    <h2 className="team-name">{team.name}</h2>
                    <h6 className="team-details">{team.details}</h6>
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
                                    <td>Captains cannot be removed from roster</td>
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
                                            <Link to={`/team/${id}/Remove/${player.id}`}>
                                                <Button className="btn btn-primary">Remove from Roster</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    <div className="button-container">
                        <Link to={`/team/${id}/AddPlayers`}>
                            <button className="btn btn-primary">Add Players</button>
                        </Link>
                    </div>
                    <div className="button-container">
                        <Link to={`/team/${id}`}>
                            <button className="btn btn-primary">Done</button>
                        </Link>
                    </div>
                </>
            ) : (
                <p>Only the captain of this team can manage this roster.</p>
            )}
        </div>
    );

}

export default ManageRoster
