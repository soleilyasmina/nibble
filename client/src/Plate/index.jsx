import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { allNibbles } from "../services/nibbles";
import { getUserInfo } from "../services/users";
import Follow from "../shared/Follow.jsx";
import Nibbles from "../shared/Nibbles.jsx";

const Plate = (props) => {
  const [nibbles, setNibbles] = useState([]);
  const [userInfo, setUserInfo] = useState({})
  const { user_id } = useParams();

  useEffect(() => {
    (async () => {
      const newUserInfo = await getUserInfo(user_id);
      const userNibbles = await allNibbles(user_id);
      setNibbles(userNibbles);
      setUserInfo(newUserInfo);
    })();
  }, [user_id]);

  return (
    <Container className="mt-2" md={{ span: 2, offset: 0 }}>
      <Card bg="primary" text="light">
        <Card.Header>
          <Card.Text className="d-inline font-weight-bold">
            {userInfo && userInfo.username}
          </Card.Text>
          <Follow userId={user_id} user={props.user} />
          <Card.Text className="mb-0 font-italic"> 
            {userInfo && userInfo.followerCount} followers
          </Card.Text>
          <Card.Text className="mb-0 font-italic">
            {userInfo && userInfo.nibbleCount} nibbles
          </Card.Text>
        </Card.Header>
      </Card>
      <Nibbles posts={nibbles} user={props.user} setUser={props.setUser} setToggleFollowing={props.setToggleFollowing}/>
    </Container>
  )
};

export default Plate;
