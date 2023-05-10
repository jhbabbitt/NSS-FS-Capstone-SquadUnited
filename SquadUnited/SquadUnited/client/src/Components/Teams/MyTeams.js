import { useState, useEffect } from "react";
import { getMyTeams } from "../../Modules/teamManager";
import { Link } from "react-router-dom";

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
            {teams.length > 0 ? (
              teams.map((team) => (
                <div key={team.id}>
                  <p>{team.name}</p>
                  <p>{team.league.name}</p>
                  <Link to={`/team/${team.id}`}>
                    <button>View Details</button>
                  </Link>
                </div>
              ))
            ) : (
              <p>You are currently not on any teams.</p>
            )}
          </div>
        </div>
      );
      

};

export default MyTeams;