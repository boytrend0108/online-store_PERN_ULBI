import Container from 'react-bootstrap/esm/Container';
import { Button, Card, Form, Stack } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../utils/constants';
import { login, registration } from '../http/userApi';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = pathname === LOGIN_ROUTE;

  const click = async () => {
    try {
      let data;

      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
      console.log('login', user.isAuth);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: '600px' }} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Login' : 'Registration'}</h2>

        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
          <Stack
            direction='horizontal'
            className='d-flex justify-content-between align-items-center mt-3'
          >
            <div>
              {isLogin ? (
                <div className='d-flex  gap-2'>
                  Нет аккаунта?
                  <NavLink to={REGISTRATION_ROUTE} className='ml-2'>
                    Register
                  </NavLink>
                </div>
              ) : (
                <div className='d-flex  gap-2'>
                  Есть аккаунт?
                  <NavLink to={LOGIN_ROUTE} className='ml-2'>
                    Log in
                  </NavLink>
                </div>
              )}
            </div>
            <Button variant='outline-success' className='mt-3' onClick={click}>
              {isLogin ? 'Login' : 'Registration'}
            </Button>
          </Stack>
        </Form>
      </Card>
    </Container>
  );
});
export default Auth;
