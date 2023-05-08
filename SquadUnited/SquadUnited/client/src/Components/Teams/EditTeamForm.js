import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FormGroup, Input, Card, CardBody, Form, CardTitle, Button, Label } from "reactstrap"
import { getTeam } from "../../Modules/teamManager";
import { updateTeam } from "../../Modules/teamManager";

export const EditTeamForm = () => {
    const [team, setTeam] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeam(id).then(setTeam)
    }, [])

    if (!team) {
        return null;
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;
        const teamCopy = { ...team };

        teamCopy[key] = value;
        setTeam(teamCopy);
    };

    const handleSave = (event) => {
        event.preventDefault();

        updateTeam(team).then(() => {
            navigate(`/team/${team.id}`);
        });
    };

    return (
        <div className="container">
            <Card>
                <CardTitle>Edit Team</CardTitle>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Input id="id" type="hidden" name="id" value={team.id} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="subject">Team Name</Label>
                            <Input type="text" name="name" id="name" placeholder="team name"
                                value={team.name}
                                onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">Team Details</Label>
                            <Input type="text" name="details" id="details" placeholder="team details"
                                value={team.details}
                                onChange={handleInputChange} />
                        </FormGroup>
                        <Button className="btn btn-primary" onClick={handleSave} >
                            Submit
                        </Button>
                        <Button className="btn btn-danger" href="/teams">
                            Cancel
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
