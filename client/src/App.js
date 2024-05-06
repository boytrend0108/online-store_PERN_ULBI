import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import MyNavbar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { useContext, useEffect, useState } from 'react';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loaging, setLoaging] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(() => {
        user.setUser({});
        user.setIsAuth(false);
      })
      .finally(() => setLoaging(false));
  }, []);

  if (loaging) {
    return <Spinner animation='grow' />;
  }

  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
