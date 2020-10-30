import { useEffect, useState } from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const SiteNav = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);

  return (
    <Navbar sticky="top" bg="light" expand="md">
      <Navbar.Brand><Link className="text-dark" to="/dashboard">Nibble</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="text-secondary" to={`/users/${props.user && props.user.id}`}>My Plate</Link>
        </Nav>
        <Form inline>
          <FormControl value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-secondary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default SiteNav;
