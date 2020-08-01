// starts the React application
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import NavBar from './comps/NavBar/NavBar'
import SignUp from './comps/SignUp'
import SignIn from './comps/SignIn'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
