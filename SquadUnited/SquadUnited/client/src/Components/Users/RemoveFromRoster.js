import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardTitle, Form, FormGroup, Input } from "reactstrap";
import { getTeam } from "../../Modules/teamManager";
import { RemovePlayerFromTeam, getUser } from "../../Modules/userManager";
import { getCurrentUserRole } from "../../Modules/roleManager";
import { me } from "../../Modules/authManager";
import "./HorizButtons.css";

export const RemovefromRoster = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [team, setTeam] = useState();
    const [player, setPlayer] = useState({})
    const [userRole, setUserRole] = useState({});
    const { id, playerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            me(),
            getTeam(id),
            getUser(playerId),
            getCurrentUserRole(id)
        ]).then(([user, teamData, playerData, roleData]) => {
            setCurrentUser(user);
            setTeam(teamData);
            setPlayer(playerData);
            setUserRole(roleData);
        });
    }, [id, playerId]);

    if (!team) {
        return null;
    }

    const handleDeleteAsCaptain = (event) => {
        event.preventDefault();

        RemovePlayerFromTeam(id, playerId).then((p) => {
            navigate(`/team/${id}/ManageRoster`);
        });
    };

    const handleDeleteAsPlayer = (event) => {
        event.preventDefault();

        RemovePlayerFromTeam(id, playerId).then((p) => {
            navigate(`/team/${id}`);
        });
    };

    return (
        <>
            {userRole && userRole.id === 1 && (
                <div className="container">
                    <Card>
                        <CardTitle>
                            Are you sure you want to remove {player.name} from {team.name}?
                        </CardTitle>
                        <Form>
                            <FormGroup>
                                <Input id="id" type="hidden" name="id" value={team.id} />
                            </FormGroup>
                            <Button color="primary" className="btn btn-primary" onClick={handleDeleteAsCaptain}>
                                REMOVE
                            </Button>
                            <span className="button-space" />
                            <Button color="danger" className="btn btn-danger" href="/">
                                Cancel
                            </Button>
                        </Form>
                    </Card>
                </div>
            )}
            {userRole && userRole.id === 2 && currentUser?.id === player.id && (
                <div className="container">
                    <Card>
                        <CardTitle>
                            Are you sure you want to leave {team.name}?
                        </CardTitle>
                        <Form>
                            <FormGroup>
                                <Input id="id" type="hidden" name="id" value={team.id} />
                            </FormGroup>
                            <Button color="primary" className="btn btn-primary" onClick={handleDeleteAsPlayer}>
                                LEAVE
                            </Button>
                            <span className="button-space" />
                            <Button color="danger" className="btn btn-danger" href="/">
                                Cancel
                            </Button>
                        </Form>
                    </Card>
                </div>
            )}
            {(!userRole || (userRole.id === 2 && currentUser?.id !== player.id)) && (
                <p>You are not authorized to manage this roster.</p>
            )}
        </>
    );
}