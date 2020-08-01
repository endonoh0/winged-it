// starts the React application
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import NavBar from './comps/NavBar'

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <section className="sidebar">
        <h1>Winged It</h1>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        </nav>
      </section>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
