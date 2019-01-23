import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Authenticator, Greetings, SignUp } from 'aws-amplify-react';
import AppliedRoute from './components/AppliedRoute';
// import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './containers/NotFound';
import NewNote from './containers/NewNote';
import Home from './containers/Home';

const propTypes = {
  onUserSignIn: PropTypes.func.isRequired,
};

class AuthComponent extends Component {
  constructor(props) {
    super(props);

    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(state) {
    if (state === 'signedIn') {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onUserSignIn();
    }
  }

  render() {
    return (
      <div>
        <Authenticator
          onStateChange={this.handleStateChange}
          hide={[Greetings, SignUp]}
        />
      </div>
    );
  }
}

AuthComponent.propTypes = propTypes;

// eslint-disable-next-line react/prop-types
export default ({ childProps }) => (
  <Switch>
    <Route exact path="/" component={Home} props={childProps} />
    <AppliedRoute
      exact
      path="/login"
      component={AuthComponent}
      props={childProps}
    />
    <AppliedRoute
      exact
      path="/notes/new"
      component={NewNote}
      props={childProps}
    />
    {/* <ProtectedRoute
      exact
      path="/protected"
      component={Container}
      props={childProps}
    /> */}
    <Route component={NotFound} />
  </Switch>
);
