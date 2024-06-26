import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/userStore';
import DeviceStore from './store/deviceStore';

export const Context = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
