import { useParams } from "react-router-dom";
import { getUser } from "../../Modules/userManager";
import { useState, useEffect } from "react";

export const PlayerDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(id);
        setUser(fetchedUser);
      } catch (error) {
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="container">
      <h2>Player Details</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading player details...</p>
      )}
    </div>
  );
  
};
