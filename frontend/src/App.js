import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import './App.css';
import { FormikRegisterForm } from './components/Form/Form';
import { FormikLoginForm } from './components/Form/Form';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar/Navbar';

import Display from './components/Display/Display';
import './styles.css';


function App() {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <Navbar />
      {/* <Route path="/" render={(props) => {
        const token = localStorage.getItem('token');
        if (token) {
          return <Redirect to='/display' />;
        }
        return <FormikLoginForm {...props} />;
      }}
      /> */}

      <Route exact path='/register' render={props => <FormikRegisterForm {...props} setToken={setToken} text="Register Form" />} />
      <Route exact path='/login' render={props => <FormikLoginForm {...props} setToken={setToken} text="Login Form" />} />
      <PrivateRoute exact path='/display' component={Display} token={token} />
    </div>
  );
}

export default App;