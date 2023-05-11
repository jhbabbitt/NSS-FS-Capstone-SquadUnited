import { me } from "../../Modules/authManager";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Modules/userManager";
import { FormGroup, Input, Card, CardBody, Form, CardTitle, Button, Label } from "reactstrap"
import "./HorizButtons.css";

export const EditProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    me().then(setCurrentUser);
  }, []);

  if (!currentUser) {
    return null;
  }

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    const updatedUser = { ...currentUser, [key]: value };
    setCurrentUser(updatedUser);
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateUser(currentUser).then(() => {
      navigate(`/profile`);
    });
  };

  return (
    <div className="container">
      <Card>
        <CardTitle>Edit your Profile</CardTitle>
        <CardBody>
          <Form>
            <FormGroup>
              <Input id="id" type="hidden" name="id" value={currentUser.id} />
            </FormGroup>
            <FormGroup>
              <Label for="name">Full Name</Label>
              <Input type="text" id="name" value={currentUser.name} onChange={handleChange} />
            </FormGroup>
            <Button color="primary" className="btn btn-primary" onClick={handleSave}>
              Submit
            </Button>
            <span className="button-space" />
            <Button className="btn btn-danger" href="/profile">
              Cancel
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

