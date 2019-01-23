import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Amplify, { Auth } from 'aws-amplify';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Routes from './Routes';
import config from './config';
import './App.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'notes',
        endpoint: `${config.apiGateway.URL}/api`,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: {
        isLoggedIn: false,
      },
    };
    this.handleUserSignIn = this.handleUserSignIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    try {
      await Auth.currentAuthenticatedUser({
        bypassCache: false,
      });
      this.setState({ authState: { isLoggedIn: true } });
    } catch (e) {
      // do nothing
    }
  }

  handleUserSignIn() {
    this.setState({ authState: { isLoggedIn: true } });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  }

  async handleLogout() {
    this.setState({ authState: { isLoggedIn: false } });
    await Auth.signOut();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  }

  render() {
    const { authState } = this.state;

    const childProps = {
      isLoggedIn: authState.isLoggedIn,
      onUserSignIn: this.handleUserSignIn,
    };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Sirris Secure WebApp Demo</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/notes/new">
                <NavItem>New Note</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              {authState.isLoggedIn ? (
                <Fragment>
                  <NavItem>Logged in</NavItem>
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <NavItem>Not logged in</NavItem>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Routes childProps={childProps} />
      </div>
    );
  }
}
App.propTypes = propTypes;

export default withRouter(App);
