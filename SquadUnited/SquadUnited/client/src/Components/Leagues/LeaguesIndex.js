import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { getActiveLeagues } from "../../Modules/leagueManager";

export const LeaguesIndex = () => {
  const [leagues, setLeagues] = useState([]);
  
  const fetchLeagues = async () => {
    const activeLeagues = await getActiveLeagues();
    setLeagues(activeLeagues);
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  return (
    <div className="container">
      <h2>All Leagues</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => (
            <tr key={league.id}>
              <td>{league.name}</td>
              <td>{league.description}</td>
              <td>
                <Link to={`/Leagues/${league.id}`}>
                  <button>View Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
