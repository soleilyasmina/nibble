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

  return (
    <Navbar sticky="top" bg="light" expand="md" expanded={expanded} onToggle={(e) => setExpanded(e)}>
      <Navbar.Brand><Link className="text-dark" to="/dashboard">Nibble</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="text-secondary mb-2 mb-md-0" to={`/users/${props.user && props.user.id}`}>My Plate</Link>
        </Nav>
        {props.user && (
          <Form inline>
            <FormControl value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
            <ListGroup className="position-absolute nav-options">
              {searchOptions.map((opt, i) => (
                <ListGroupItem>
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
