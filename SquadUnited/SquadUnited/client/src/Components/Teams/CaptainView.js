import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row } from "reactstrap";

const CaptainView = () => {
  const { id } = useParams();

  return (
    <Container className="captain-view-container">
      <h4>You are the captain.</h4>
      <Row>
        <Col>
          <Link to={`/team/${id}/EditTeam`}>
            <Button color="primary">Edit Team</Button>
          </Link>
        </Col>
        <Col>
          <Link to={`/team/${id}/ManageRoster`}>
            <Button color="primary">Manage Roster</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CaptainView;
