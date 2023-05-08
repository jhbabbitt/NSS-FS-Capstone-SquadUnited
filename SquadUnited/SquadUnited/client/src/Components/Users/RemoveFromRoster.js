import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input } from "reactstrap";
import { getTeam } from "../../Modules/teamManager";
import { RemovePlayerFromTeam, getUser } from "../../Modules/userManager";
import { getCurrentUserRole } from "../../Modules/roleManager";

export const RemovefromRoster = () => {
    const [team, setTeam] = useState();
    const [player, setPlayer] = useState({})
    const [userRole, setUserRole] = useState({});
    const { id, playerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeam(id).then(setTeam);
        getUser(playerId).then(setPlayer)
        getCurrentUserRole(id).then(setUserRole);
    }, []);

    if (!team) {
        return null;
    }

    const handleDelete = (event) => {
        event.preventDefault();

        RemovePlayerFromTeam(id, playerId).then((p) => {
            navigate(`/team/${id}/ManageRoster`);
        });
    };

    return (
        <div className="container">
            {userRole && userRole.id === 1 ? (
                <>
                    <Card>
                        <CardTitle>Are you sure you want to remove {player.name} from {team.name}?</CardTitle>
                        <Form>
                            <FormGroup>
                                <Input id="id" type="hidden" name="id" value={team.id} />
                            </FormGroup>
                            <Button className="btn btn-primary" onClick={handleDelete}>
                                REMOVE
                            </Button>
                            <Button className="btn btn-danger" href="/">
                                Cancel
                            </Button>
                        </Form>
                    </Card>
                </>
            ) : (
                <p>Only the captain of this team can manage this roster.</p>
            )}
        </div>
    );
};