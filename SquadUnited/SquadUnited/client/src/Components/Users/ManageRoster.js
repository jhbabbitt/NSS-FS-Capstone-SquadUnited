import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUserRole } from "../../Modules/roleManager";
import { getTeam } from "../../Modules/teamManager"
import { getPlayersOnATeam, getCaptainsOnATeam } from "../../Modules/userManager";
import { Link } from "react-router-dom";

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
                    <h2>{team.name}</h2>
                    <h6>{team.details}</h6>
                    <h5>Team Captain:</h5>
                    <div className="row justify-content-center">
                        {captains.map((captain) => (
                            <div key={captain.id}>
                                <p>{captain.name}</p>
                                <p>{captain.email}</p>
                                <button>Captains cannot be removed from a roster</button>
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
                                    <Link to={`/team/${id}/Remove/${player.id}`}>
                                        <button>Remove from Roster</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <button>Add Players</button>
                </>
            ) : (
                <p>Only the captain of this team can manage this roster.</p>
            )}
        </div>
    );
}

export default ManageRoster