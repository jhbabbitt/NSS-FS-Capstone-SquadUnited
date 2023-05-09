import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FormGroup, Input, Card, CardBody, Form, CardTitle, Button, Label } from "reactstrap"
import { CreateTeam } from "../../Modules/teamManager";
import { me } from "../../Modules/authManager";
import { IsUserInLeague } from "../../Modules/userManager";

export const CreateTeamForm = () => {
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null)
    const [isPlayerInLeague, setIsPlayerInLeague] = useState(false);
    const [team, setTeam] = useState({
        name: "",
        details: "",
        public: false,
        leagueId: id
    });
    const navigate = useNavigate();

    useEffect(() => {
        me().then((user) => {
            if (user) {
                IsUserInLeague(id, user.id).then((result) => setIsPlayerInLeague(result));
                setCurrentUser(user);
            }
        });
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        const key = event.target.id;
        const teamCopy = { ...team };

        teamCopy[key] = value;
        setTeam(teamCopy);
    };

    const handleSave = (event) => {
        event.preventDefault();

        CreateTeam(team).then(() => {
            navigate(`/`);
        });
    };

    return (
        <div className="container">
          <Card>
            <CardTitle>Create Team</CardTitle>
            <CardBody>
              {isPlayerInLeague ? (
                <p>You are already registered with a team in this league.</p>
              ) : (
                <Form>
                  <FormGroup>
                    <Label for="name">Team Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="team name"
                      value={team.name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="details">Team Details</Label>
                    <Input
                      type="text"
                      name="details"
                      id="details"
                      placeholder="team details"
                      value={team.details}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="public"
                        id="public"
                        checked={team.public}
                        onChange={handleInputChange}
                      />
                      {" "}
                      Public
                    </Label>
                  </FormGroup>
                  <Button className="btn btn-primary" onClick={handleSave}>
                    Submit
                  </Button>
                  <Button className="btn btn-danger" href={`/league/${id}`}>
                    Cancel
                  </Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </div>
      );
      
}

