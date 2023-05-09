import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getActiveLeagues } from "../../Modules/leagueManager";

export const LeaguesIndex = () => {
    const [leagues, setLeagues] = useState([]);
    const getLeagues = () => {
        getActiveLeagues().then(leagues => setLeagues(leagues));
    };

    useEffect(() => {
        getLeagues();
    }, []);

    return(
        <div className="container">
            <h2>All Leagues</h2>
            <div className="row justify-content-center">
                {leagues.map((league) => (
                    <div key={league.id}>
                        <p>{league.name}</p>
                        <Link to={`/league/${league.id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}