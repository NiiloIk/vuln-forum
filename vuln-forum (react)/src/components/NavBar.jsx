import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
    setUser()
  }

  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Fragile Forum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Frontpage</Nav.Link>
            <Nav.Link href={`/user/${user}`}>My Account</Nav.Link>
            {/* <Nav.Link href="/settings">Settings</Nav.Link>*/}
            {user ? (
              <NavDropdown title={`Logged in as: ${user}`} id="user-dropdown">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar