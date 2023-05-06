import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getPlayersOnATeam, getCaptainsOnATeam } from "../../Modules/userManager";
import { getTeam } from "../../Modules/teamManager"
import { getCurrentUserRole } from "../../Modules/roleManager";
import EditTeam from "./EditTeam";


const TeamDetails = () => {
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

    console.log(team.name)
    console.log(userRole.name)

    return (
        <div className="container">
            <h2>{team.name}</h2>
            {userRole && userRole.id === 1 ? <EditTeam /> : null}
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
            <div className="row justify-content-center">
                {players.map((player) => (
                    <div key={player.id}>
                        <p>{player.name}</p>
                        <p>{player.email}</p>
                        <button>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamDetails