import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '..';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/constants';

const MyNavbar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const logout = () => {
    user.setUser([]);
    user.setIsAuth(false);
    navigate(LOGIN_ROUTE);
  };

  return (
    <Navbar expand='lg' bg='dark' data-bs-theme='dark'>
      <Container>
        <NavLink to='/' style={{ textDecoration: 'none', color: '#fff' }}>
          ONLINE STORE
        </NavLink>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll' className='justify-content-end'>
          {user._isAuth ? (
            <Nav
              className='ml-auto my-2 my-lg-0'
              style={{ maxHeight: '100px', gap: '10px' }}
              navbarScroll
            >
              <Button
                variant='outline-light'
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Admin
              </Button>
              <Button variant='outline-light' onClick={() => logout()}>
                Logout
              </Button>
            </Nav>
          ) : (
            <Nav
              className='ml-auto my-2 my-lg-0'
              style={{ maxHeight: '100px', gap: '10px' }}
              navbarScroll
            >
              <Button
                variant='outline-light'
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Login
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
export default MyNavbar;
