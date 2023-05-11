import { useState, useEffect } from "react";
import { getMyTeams } from "../../Modules/teamManager";
import { Link } from "react-router-dom";
import { Table } from "reactstrap"; // Import Reactstrap Table component

const MyTeams = () => {
  const [teams, setTeams] = useState([]);
  const getTeams = () => {
    getMyTeams().then((teams) => setTeams(teams));
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="container">
      <h2>My Teams</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>League</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.league.name}</td>
                <td>
                  <Link to={`/team/${team.id}`}>
                    <button>View Details</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>You are currently not on any teams.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MyTeams;
