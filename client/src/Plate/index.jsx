import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Nibbles from "../shared/Nibbles.jsx";
import { allNibbles } from "../services/nibbles";

const Plate = (props) => {
  const [nibbles, setNibbles] = useState([]);
  const { user_id } = useParams();

  useEffect(() => {
    (async () => {
      const userNibbles = await allNibbles(user_id);
      setNibbles(userNibbles);
    })();
  }, [user_id]);

  return (
    <Container className="mt-2" md={{ span: 2, offset: 0 }}>
      <Nibbles posts={nibbles} user={props.user} setUser={props.setUser} setToggleFollowing={props.setToggleFollowing}/>
    </Container>
  )
};

export default Plate;
