import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";
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

  useEffect(() => {
    if (user) {
      (async () => {
        setFollowing(await followingNibbles());
      })();
      history.push('/dashboard')
    } else if (localStorage.getItem('token')) {
      (async () => {
        setUser(await verify());
      })();
    } else {
      history.push('/login');
    }
  }, [user, toggleFollowing, history]);

  return (
    <div className="App">
      <SiteNav user={user} setUser={setUser} />
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
