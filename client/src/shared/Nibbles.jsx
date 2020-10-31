import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import Nibble from "./Nibble.jsx";
import Notification from "./Notification.jsx";

const Nibbles = (props) => {
  const [alerts, setAlerts] = useState([]);
  const { posts, ...rest } = props;

  useEffect(() => {
    if (alerts.length) {
      setTimeout(() => setAlerts(prevAlerts => {
        prevAlerts.shift();
        return [...prevAlerts];
      }), 4000);
    } else {
      console.log('hello')
    }
  }, [alerts]);

  return (
    <>
      {posts.map((n) => (
        <Nibble key={n._id} {...rest} n={n} setAlerts={setAlerts} />
      ))}
      <Container className="d-flex flex-column-reverse justify-content-end align-items-end fixed-bottom mr-2">
        {alerts.map((alert) => (
          <Notification alert={alert} /> 
        ))}
      </Container>
    </>
  )
}

export default Nibbles;
