import { useEffect, useState } from "react";
import { Button,  Col, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createNibble } from "../services/nibbles";
import Nibbles from "../shared/Nibbles";

const Dashboard = (props) => {
  const [content, setContent] = useState('');
  const history = useHistory();

  const newNibble = async (e) => {
    e.preventDefault();
    if (content) {
      await createNibble({ content });
      props.setToggleFollowing(prev => !prev);
      setContent('');
    }
  }

  useEffect(() => {
    if (!props.user || (props.user && !props.user.id)) {
      history.push("/login");
    }
  }, [props.user, history]);

  return (
    <>
      <Container className="mt-3" md={{ span: 2, offset: 0 }}>
        <Form onSubmit={newNibble} className="mb-2" >
          <Form.Row className="justify-content-end align-items-center">
            <Col>
              <Form.Control type="content" placeholder="Enter content:" value={content} onChange={(e) => setContent(e.target.value)} />
            </Col>
            <Col xs="auto">
              <Button className="font-weight-bold" variant="primary" type="submit">Nibble</Button>
            </Col>
          </Form.Row>
        </Form>

        <Nibbles posts={props.following} user={props.user} setUser={props.setUser} setToggleFollowing={props.setToggleFollowing}/>
      </Container>
    </>
  )
}

export default Dashboard;
