import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink, useNavigate} from "react-router-dom";

import { useSelector } from 'react-redux';

const Header = () => {

    
const isAuthenticated = useSelector(state => state.user.isAuthenticated); 
const account = useSelector(state => state.user.account); 

  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/login'); 
    
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">Demo Manger User</Navbar.Brand> */}
        <NavLink to='/' className='navbar-brand'>Demo Manger User</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#admin">Admin</Nav.Link> */}
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="/users" className='nav-link'>Users</NavLink>
            <NavLink to="/admins" className='nav-link'>Admin</NavLink>
            
          </Nav>

          <Nav>
            {isAuthenticated === false ?
                <>
                    <button className='btn-login' onClick={() => {handleLogin()}} >Login</button>
                    <button className='btn-signup'>Sign up</button>
                </>
                :
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {/* <NavDropdown.Item>Log in</NavDropdown.Item> */}
                    <NavDropdown.Item>Log out</NavDropdown.Item>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                </NavDropdown>
            }
           
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;