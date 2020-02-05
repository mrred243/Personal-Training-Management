import React from 'react';
import Customers from './components/customers.js';
import Training from './components/trainings.js';
import TrainingPage from './components/trainingPages.js';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import MyCalendar from './components/calendar.js';
import Register from './components/register.js';
import Login from './components/login.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Link className="nav" to="/">Customer</Link>{''}
          <Link className="nav" to="/trainings">Trainings</Link>{''}
          {/*<Link className="nav" to="/calendar">Calendar</Link>{''}*/}
          <Link className="nav login" to="/login">Login</Link>{''}
          <Link className="nav login" to="/register">Sign up</Link>{''}
        </div>

        <Switch>
          <Route exact path="/" component={Customers}/>
          <Route path="/trainings" component={TrainingPage}/>
          <Route path="/calendar" component={MyCalendar}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>

          <Route render={() => <h1>Page not found</h1>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
