import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeam } from "../../Modules/teamManager"
import { Link } from "react-router-dom";
import { getCurrentUserRole } from "../../Modules/roleManager";
import { getAvailablePlayers } from "../../Modules/userManager";

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
                        <div className="row justify-content-center">
                            {players.map((player) => (
                                <div key={player.id}>
                                    <p>{player.name}</p>
                                    <p>{player.email}</p>
                                    <Link to={`/team/${id}/AddToRoster/${player.id}`}>
                                        <button>Add to Roster</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link to={`/team/${id}`}>
                        <button>Done</button>
                    </Link>
                </>
            ) : (
                <p>Only the captain of this team can manage this roster.</p>
            )}
        </div>
    );
}