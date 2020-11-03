import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { allNibbles, lazyAllNibbles } from "../services/nibbles";
import { getUserInfo } from "../services/users";
import Follow from "../shared/Follow.jsx";
import Nibbles from "../shared/Nibbles.jsx";

const Plate = (props) => {
  const [nibbles, setNibbles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [lazyLoads, setLazyLoads] = useState(0);
  const { user_id } = useParams();

  useEffect(() => {
    (async () => {
      const newUserInfo = await getUserInfo(user_id);
      const userNibbles = await allNibbles(user_id);
      setNibbles(userNibbles);
      setUserInfo(newUserInfo);
    })();
  }, [props.user, user_id]);

  useEffect(() => {
    const lazyLoad = async () => {
      if (nibbles.length && nibbles.length % 20 === 0 &&!!lazyLoads) {
        const newNibbles = await lazyAllNibbles(
          nibbles[nibbles.length - 1]
        );
        setNibbles(nib => [...nib, ...newNibbles]);
      }
    };
    lazyLoad();
  }, [lazyLoads]);

  return (
    <Container className="mt-2" md={{ span: 2, offset: 0 }}>
      <Card className="mb-2" bg="primary" text="light">
        <Card.Header>
          <Card.Text className="d-inline font-weight-bold">
            {userInfo && userInfo.username}
          </Card.Text>
          <Follow userId={user_id} user={props.user} setUser={props.setUser}/>
          <Card.Text className="mb-0 font-italic">
            {userInfo && userInfo.followerCount} followers
          </Card.Text>
          <Card.Text className="mb-0 font-italic">
            {userInfo && userInfo.followingCount} following
          </Card.Text>
          <Card.Text className="mb-0 font-italic">
            {userInfo && userInfo.nibbleCount} nibbles
          </Card.Text>
        </Card.Header>
      </Card>
      <Nibbles cb={() => setLazyLoads(ll => ll + 1)} posts={nibbles} user={props.user} setUser={props.setUser} setToggleFollowing={props.setToggleFollowing}/>
    </Container>
  )
};

export default Plate;
