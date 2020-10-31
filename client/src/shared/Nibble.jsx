import { useState } from "react";
import { Button, Card, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { createBite } from "../services/nibbles";
import Follow from "./Follow.jsx";
import UserLink from "./UserLink.jsx";

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
          <Card.Header className="d-flex align-items-center md-4">
            {n.parent
              ? (
                <>
                  <UserLink linkedUser={n} />
                  <i className="ml-2 mr-2 fa fa-cookie-bite"></i>
                  <UserLink linkedUser={n.parent} />
                  <Follow nibble={n.parent} user={props.user} setUser={props.setUser} />
                </>
              )
              : (
                <>
                  <UserLink linkedUser={n} />
                  <Follow nibble={n} user={props.user} setUser={props.setUser} />
                </>
              )}
          </Card.Header>
          {n.contentAncestors.map((ca) => (
            <ListGroupItem key={`${ca._id}-${n._id}`}>
              <UserLink linkedUser={ca} />
              <span className="d-block">{ca.content}</span>
            </ListGroupItem>
          ))}
          {n.content &&
            <ListGroupItem>
              {n.parent !== null && (
                <>
                  <UserLink linkedUser={n} />
                </>
              )}
              <span className="d-block">{n.content}</span>
            </ListGroupItem>
          }
          <Card.Footer>
            <Form onSubmit={newBite} >
              <Form.Row className="d-flex justify-content-end align-items-center">
                <Col>
                  <Form.Control type="content" placeholder="Enter content:" value={content} onChange={(e) => setContent(e.target.value)} />
                </Col>
                <Col xs="auto">
                  <Button className="font-weight-bold" variant="primary" type="submit">Bite</Button>
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
