import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserShow from './components/UserShow.js'


ReactDOM.render((
  <Router>
    <React.Fragment>
      <Route exact path ='/' component={App} />
      <Route  path ='/users/:id' component={UserShow} />
      <Route  path ='/user/:id/edit' component={UserShow} />
    </React.Fragment>
  </Router>),
  document.getElementById('root')
);

serviceWorker.unregister();
