import { useState } from "react";
import { Button, Card, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { createBite } from "../services/nibbles";

const Nibble = (props) => {
  const [content, setContent] = useState('');
  const { n } = props;

  const newBite = async (e) => {
    e.preventDefault();
    await createBite({ content }, n._id);
    setContent('');
    props.setToggleFollowing(prev => !prev);
  }

  return (
    <Row>
      <Col>
        <Card className="mt-2 mb-2">
          <Card.Header>{n.parent ? `${n.user_id.username} << ${n.parent.user_id.username}` : n.user_id.username}</Card.Header>
          {n.contentAncestors.map((ca) => (
            <ListGroupItem>
              <Card.Title>{ca.user_id.username}</Card.Title>
              {ca.content}
            </ListGroupItem>
          ))}
          {n.content &&
            <ListGroupItem>
              {n.parent !== null && <Card.Title>{n.user_id.username}</Card.Title>}
              {n.content}
            </ListGroupItem>
          }
          <Card.Footer>
            <Form onSubmit={newBite} >
              <Form.Row className="d-flex justify-content-end align-items-center">
                <Col xs="auto">
                  <Form.Label className="mt-2">Content:</Form.Label>
                </Col>
                <Col>
                  <Form.Control type="content" placeholder="Enter content:" value={content} onChange={(e) => setContent(e.target.value)} />
                </Col>
                <Col xs="auto">
                  <Button variant="primary" type="submit">Bite</Button>
                </Col>
              </Form.Row>
            </Form>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  )
}

export default Nibble;
