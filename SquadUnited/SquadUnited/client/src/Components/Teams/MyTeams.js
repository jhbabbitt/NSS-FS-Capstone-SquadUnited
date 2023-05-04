import { useState, useEffect } from "react";
import { getMyTeams } from "../../Modules/teamManager";

const MyTeams = () => {
    const [teams, setTeams] = useState([]);
    const getTeams = () => {
        getMyTeams().then(teams => setTeams(teams));
    };

    useEffect(() => {
        getTeams();
    }, []);

    return (
        <div className="container">
            <h2>My Teams</h2>
            <div className="row justify-content-center">
                {teams.map((team) => (
                    <div key={team.id}>
                        <p>{team.name}</p>
                        <p>{team.league.name}</p>
                        <button>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default MyTeams;