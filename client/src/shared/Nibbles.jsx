import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Nibble from "./Nibble.jsx";
import Notification from "./Notification.jsx";
import Observer from "./Observer.jsx";

const Nibbles = (props) => {
  const [alerts, setAlerts] = useState([]);
  const [stopLoad, toggleStopLoad] = useState(false);
  const { posts, ...rest } = props;

  useEffect(() => {
    if (alerts.length) {
      setTimeout(() => setAlerts(prevAlerts => {
        prevAlerts.shift();
        return [...prevAlerts];
      }), 4000);
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
      {!!posts.length && !stopLoad && <Observer cb={props.cb}/> }
    </>
  )
}

export default Nibbles;
