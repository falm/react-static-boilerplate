import React, { Component, PropTypes } from 'react';
import { Route, withRouter, Switch , Router} from 'react-router-dom';
import ErrorPage from './error/index';
import HomePage from './home/index';
import AboutPage from './about/index';
import history from './history';

class Root extends Component {
  render(){
    return (
      <Router history={history}>
        <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={withRouter(HomePage)}/>
            <Route path="/about" component={withRouter(AboutPage)}/>
            <Route path="/error" component={withRouter(ErrorPage)} />
        </div>
      </Router>

    )
  }
}

export default Root;
