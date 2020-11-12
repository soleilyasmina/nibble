import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { oneNibble } from "../services/nibbles";
import UserLink from "./UserLink.jsx";

const Bites = (props) => {
  const [bites, setBites] = useState([]);

  useEffect(() => {
    (async () => {
      const { history } = await oneNibble(props.nibbleId);
      console.log(history);
      setBites(history);
    })();
  }, [props.nibbleId]);

  return (
    <ListGroup className="position-absolute bites" id={`popover-${props.nibbleId}`}>
      {bites.map((bite, i) => (
        <ListGroup.Item key={`search-${bite._id}`}>
          <UserLink linkedUser={bite} />
          <i className="ml-2 mr-2 fa fa-cookie-bite"></i>
          <UserLink linkedUser={bite.parent} />
          <br />
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Bites;
