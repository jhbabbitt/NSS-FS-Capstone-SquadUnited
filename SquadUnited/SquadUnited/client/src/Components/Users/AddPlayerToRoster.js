import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentUserRole } from "../../Modules/roleManager";
import { Button, Card, CardTitle, Form, FormGroup, Input } from "reactstrap";
import { AddPlayerToTeam } from "../../Modules/teamManager";
import { getTeam } from "../../Modules/teamManager";
import { getUser } from "../../Modules/userManager";
import { me } from "../../Modules/authManager";
import { IsUserInLeague } from "../../Modules/userManager";
import "./HorizButtons.css";

const AddtoRoster = () => {
    const [team, setTeam] = useState();
    const [player, setPlayer] = useState({})
    const [userRole, setUserRole] = useState({});
    const [currentUser, setCurrentUser] = useState(null)
    const [isPlayerInLeague, setIsPlayerInLeague] = useState(false);
    const { id, playerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const promises = [me(), getTeam(id), getUser(playerId), getCurrentUserRole(id)];

        Promise.all(promises)
            .then(([meData, teamData, playerData, userRoleData]) => {
                setCurrentUser(meData);
                setTeam(teamData);
                setPlayer(playerData);
                setUserRole(userRoleData);

                if (teamData) {
                    IsUserInLeague(teamData.leagueId, meData.id)
                        .then((isPlayerInLeagueData) => {
                            setIsPlayerInLeague(isPlayerInLeagueData);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!team) {
        return null;
    }

    const handleSubmitAsCaptain = (event) => {
        event.preventDefault();

        const dataToSendToApi = {
            userId: playerId,
            teamId: id
        }

        AddPlayerToTeam(dataToSendToApi)
            .then(() => navigate(`/team/${id}/AddPlayers`))
    }

    const handleSubmitAsPlayer = (event) => {
        event.preventDefault();

        const dataToSendToApi = {
            userId: playerId,
            teamId: id
        }

        AddPlayerToTeam(dataToSendToApi)
            .then(() => navigate(`/team/${id}`))
    }

    return (
        <>
            {userRole && userRole.id === 1 && (
                <div className="container">
                    <Card>
                        <CardTitle>
                            Are you sure you want to add {player.name} to {team.name}?
                        </CardTitle>
                        <Form>
                            <FormGroup>
                                <Input id="id" type="hidden" name="id" value={team.id} />
                            </FormGroup>
                            <Button color="primary" className="btn btn-primary" onClick={handleSubmitAsCaptain}>
                                ADD
                            </Button>
                            <span className="button-space" />
                            <Button color="danger" className="btn btn-danger" href="/">
                                Cancel
                            </Button>

                        </Form>
                    </Card>
                </div>
            )}
            {!isPlayerInLeague && team.public && currentUser?.id === player.id && (
                <div className="container">
                    <Card>
                        <CardTitle>
                            Are you sure you want to join {team.name}? You may leave at any time.
                        </CardTitle>
                        <Form>
                            <FormGroup>
                                <Input id="id" type="hidden" name="id" value={team.id} />
                            </FormGroup>
                            <Button color="primary" className="btn btn-primary" onClick={handleSubmitAsPlayer}>
                                JOIN
                            </Button>
                            <span className="button-space" />
                            <Button color="danger" className="btn btn-danger" href="/">
                                Cancel
                            </Button>
                        </Form>
                    </Card>
                </div>
            )}
            {userRole && userRole.id === 2 && (
                <p>You are already on this team.</p>
            )}
            {isPlayerInLeague && userRole.id === 2 && (
                <p>You are already on a team in this league.</p>
            )}
            {!userRole && currentUser?.id !== player.id ? (
                <p>You are not authorized to manage this roster.</p>
            ) : null}
        </>
    );
}

export default AddtoRoster