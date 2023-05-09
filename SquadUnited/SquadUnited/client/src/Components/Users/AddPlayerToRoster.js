import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentUserRole } from "../../Modules/roleManager";
import { Button, Card, CardTitle, Form, FormGroup, Input } from "reactstrap";
import { AddPlayerToTeam } from "../../Modules/teamManager";
import { getTeam } from "../../Modules/teamManager";
import { getUser } from "../../Modules/userManager";

const AddtoRoster = () => {
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

    const handleSave = (event) => {
        event.preventDefault();
    
        const dataToSendToApi = {
            userId: playerId,
            teamId: id
        }
    
        AddPlayerToTeam(dataToSendToApi)
            .then(() => navigate(`/team/${id}/AddPlayers`))
      }

    return (
        <div className="container">
            {userRole && userRole.id === 1 ? (
                <>
                    <Card>
                        <CardTitle>Are you sure you want to add {player.name} to {team.name}?</CardTitle>
                        <Form>
                            <FormGroup>
                                <Input id="id" type="hidden" name="id" value={team.id} />
                            </FormGroup>
                            <Button className="btn btn-primary" onClick={handleSave}>
                                Add
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
    )
}

export default AddtoRoster