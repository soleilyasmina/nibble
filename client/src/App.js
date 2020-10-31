import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import { followingNibbles } from "./services/nibbles";
import { verify } from "./services/users";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SiteNav from "./Nav";
import Plate from "./Plate";

function App() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [toggleFollowing, setToggleFollowing] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      (async () => {
        setFollowing(await followingNibbles());
      })();
      if (!location.pathname.includes("/users/")) {
        history.push("/dashboard");
      }
    } else if (localStorage.getItem("token")) {
      (async () => {
        const newUser = await verify();
        if (!newUser) {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          setUser(newUser);
        }
      })();
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
  }, [user, toggleFollowing, history]); // eslint-disable-line

  return (
    <div className="App">
      <SiteNav user={user} setUser={setUser} />
      <Container>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            user={user}
            setUser={setUser}
            following={following}
            setToggleFollowing={setToggleFollowing}
          />
        </Route>
        <Route path="/users/:user_id">
          <Plate
            user={user}
            setUser={setUser}
            setToggleFollowing={setToggleFollowing}
          />
        </Route>
      </Container>
    </div>
  );
}

export default App;
