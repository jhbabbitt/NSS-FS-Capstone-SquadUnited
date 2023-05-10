import { useParams } from "react-router-dom";
import { getUser } from "../../Modules/userManager";

export const PlayerDetails = () => {
    const { id } = useParams();
    const user = getUser(id);

    return (
        <div>
            <h2>Player Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}