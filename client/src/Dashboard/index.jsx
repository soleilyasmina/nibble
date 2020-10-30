import { useState } from "react";
import { Button, Card, Col, Container, Form, ListGroupItem, Row } from 'react-bootstrap';
import { createNibble } from "../services/nibbles";
import Nibble from "../shared/Nibble";

const Dashboard = (props) => {
  const [content, setContent] = useState('');

  const newNibble = async (e) => {
    e.preventDefault();
    await createNibble({ content });
    props.setToggleFollowing(prev => !prev);
    setContent('');
  }

  return (
    <>
      <Container className="mt-2" md={{ span: 2, offset: 0 }}>
        <Form onSubmit={newNibble} >
          <Form.Row className="justify-content-end align-items-center">
            
            <Col>
              <Form.Control type="content" placeholder="Enter content:" value={content} onChange={(e) => setContent(e.target.value)} />
            </Col>
            <Col xs="auto">
              <Button className="font-weight-bold" variant="primary" type="submit">Nibble</Button>
            </Col>
          </Form.Row>
        </Form>

        {props.following.map((n) => (
          <Nibble user={props.user} setUser={props.setUser} n={n} setToggleFollowing={props.setToggleFollowing} />
        ))}
      </Container>
    </>
  )
}

export default Dashboard;
