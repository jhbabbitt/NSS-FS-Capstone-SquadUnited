import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getPlayersOnATeam, getCaptainsOnATeam } from "../../Modules/userManager";
import { getTeam } from "../../Modules/teamManager"
import { getCurrentUserRole } from "../../Modules/roleManager";
import CaptainView from "./CaptainView";


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
        </div>
    );
}

export default TeamDetails