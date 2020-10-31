import { useEffect, useState } from "react";
import { Form, FormControl, ListGroup, ListGroupItem, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { search } from "../services/users";

const SiteNav = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSearchQuery('');
    setExpanded(false);
  }, [location]);

  useEffect(() => {
    if (searchQuery) {
      (async () => {
        setSearchOptions(await search(searchQuery));
      })();
    } else {
      setSearchOptions([]);
    }
  }, [searchQuery]);

  const scrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0,
    });
  }

  const logout = async () => {
    localStorage.removeItem('token');
    props.setUser(null);
  }

  const homeLink = props.user ? '/dashboard' : '/login';

  return (
    <Navbar sticky="top" bg="light" expand="sm" expanded={expanded} onToggle={(e) => setExpanded(e)}>
      <Navbar.Brand><Link className="text-dark" onClick={scrollToTop} to={homeLink}>Nibble</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="mr-auto">
          {
            props.user
              ? (
                <>
                  <Link className="text-secondary mb-2 mb-sm-0" to="/dashboard">Dashboard</Link>
                  <Link className="text-secondary mb-2 mb-sm-0 ml-0 ml-sm-2" to={`/users/${props.user && props.user.id}`}>My Plate</Link>
                  <Link className="text-secondary mb-2 mb-sm-0 ml-0 ml-sm-2" onClick={logout} to={'/login'}>Logout</Link>
                </>
              ) : (
                <Link className="text-secondary mb-2 mb-sm-0 ml-0 ml-sm-2" to="/login">Login</Link>
              )
          }
        </Nav>
        {props.user && (
          <Form inline>
            <FormControl value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
            <ListGroup className="position-absolute nav-options">
              {searchOptions.map((opt, i) => (
                <ListGroupItem key={`search-${opt._id}`}>
                  <Link className="font-weight-bold text-dark" to={`/users/${opt._id}`}>
                    {opt.username}
                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Form>
        )
        }
      </Navbar.Collapse>
    </Navbar>
  )
};

export default SiteNav;
