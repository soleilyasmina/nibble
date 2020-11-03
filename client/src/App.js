import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import { followingNibbles, lazyFollowingNibbles } from "./services/nibbles";
import { verify } from "./services/users";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SiteNav from "./Nav";
import Plate from "./Plate";

function App() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [toggleFollowing, setToggleFollowing] = useState(false);
  const [lazyLoads, setLazyLoads] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (user && user.id) {
      (async () => {
        setFollowing(await followingNibbles());
      })();
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

  useEffect(() => {
    const lazyLoadFollowing = async () => {
      if (following.length && following.length % 20 === 0 && lazyLoads >= 1) {
        const nibbles = await lazyFollowingNibbles(
          following[following.length - 1]
        );
        setFollowing(fol => [...fol, ...nibbles]);
      }
    };
    lazyLoadFollowing();
  }, [lazyLoads]);

  return (
    <div className="App">
      <SiteNav user={user} setUser={setUser} />
      <Container>
        <Route path="/login">
          <Login user={user} setUser={setUser} />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            user={user}
            setUser={setUser}
            following={following}
            setToggleFollowing={setToggleFollowing}
            cb={() => setLazyLoads(ll => ll + 1)}
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
