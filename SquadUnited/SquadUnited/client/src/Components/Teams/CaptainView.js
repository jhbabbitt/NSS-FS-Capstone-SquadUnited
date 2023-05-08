import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CaptainView = () => { 
    const { id } = useParams();
    return (
        <div>
            <h2>You are the captain.</h2>
            <Link to={`/team/${id}/EditTeam`}>
                <button>Edit Team</button>
            </Link>
            <Link to={`/team/${id}/ManageRoster`}>
                <button>Manage Roster</button>
            </Link>
        </div>
    )
}

export default CaptainView;