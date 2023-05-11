import { me } from "../../Modules/authManager";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const MyProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        me().then((user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <div className="container">
          {currentUser ? (
            <div>
              <h4>{currentUser.name}</h4>
              <p>Email: {currentUser.email}</p>
              <Link to={`/profile/edit`}>
                <button>Edit Profile</button>
              </Link>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
      
}
