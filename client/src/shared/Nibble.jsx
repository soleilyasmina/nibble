import { useState } from "react";
import { Button, Card, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { follow, unfollow } from "../services/follows";
import { createBite } from "../services/nibbles";
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

  const changeFollowStatus = async (following, user_id) => {
    if (following) {
      const user = await unfollow(user_id);
      console.log(user)
      props.setUser(user);
    } else {
      const user = await follow(user_id);
      props.setUser(user);
    }
  }

  const followMessage = (nibble, top) => {
    if (props.user.id === nibble.user_id._id) {
      return null;
    } else {
      const following = props.user.following.includes(nibble.user_id._id);
      return (
        <Card.Subtitle onClick={() => changeFollowStatus(following, nibble.user_id._id)} className={`mt-0 ml-2 d-inline text-muted cursor-pointer`}>
          {following ? 'Unfollow' : 'Follow'}
        </Card.Subtitle>
      )
    }
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
                </>
              )
              : (
                <>
                  <UserLink linkedUser={n} />
                  {followMessage(n, true)}
                </>
              )}
          </Card.Header>
          {n.contentAncestors.map((ca) => (
            <ListGroupItem>
              <UserLink linkedUser={ca} />
              {followMessage(ca, false)}
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