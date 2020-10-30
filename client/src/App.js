import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
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

  useEffect(() => {
    if (user) {
      (async () => {
        setFollowing(await followingNibbles());
      })();
    } else if (localStorage.getItem('token')) {
      (async () => {
        setUser(await verify());
      })();
    }
  }, [user, toggleFollowing]);

  return (
    <div className="App">
      <SiteNav user={user} />
      <Container>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/dashboard">
          <Dashboard user={user} setUser={setUser} following={following} setToggleFollowing={setToggleFollowing} /> 
        </Route>
        <Route path="/users/:user_id">
          <Plate user={user} setUser={setUser} setToggleFollowing={setToggleFollowing} />
        </Route>
      </Container>
    </div>
  );
}

export default App;
