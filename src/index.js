// starts the React application
import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './App';
import NavBar from './comps/NavBar/NavBar'
import SignUp from './comps/Auth/SignUp'
import SignIn from './comps/Auth/SignIn'
import SearchByIngredient from './comps/SearchByIngredient'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(

  <React.StrictMode>

    <div className="container">
      <Router>
        <NavBar />
<<<<<<< HEAD


        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={App}></Route>
              <Route path="/signup" component={SignUp}></Route>
              <Route path="/signin" component={SignIn}></Route>
            </Switch>
          </div>
        </div>
=======
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/search">
            <SearchByIngredient />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
>>>>>>> feature/search-by-ingredient
      </Router>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
