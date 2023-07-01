import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './firebase/config';
import Login from "./components/login";
import AppProvider from './context/AppProvider';
import AuthProvider, { AuthContext } from './context/AuthProvider';
import ViewProvider from './context/ViewProvider';
import Home from './components/home/index';
import AddMemberModal from './components/modal/AddMemberModal';
import { useLocation, Link, Redirect, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context/AppProvider';
import Sidebar from './components/home/Sidebar';
import Dashboard from './components/home/dashboard/Dashboard';
import AppPageLayout from './components/layout/AppPageLayout';
import Workspace from './components/home/Workspace';

export default function SecondApp() {
  return (
    <AuthProvider>
      <Router>
        {/* <SiteMap /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/my" />
          </Route>
          <PrivateRoute path="/my">
            <AppProvider>
              <AppPage />
            </AppProvider>
          </PrivateRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const auth = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const LoginPage = (props) => {
  let location = useLocation()
  let history = useHistory()
  let { from } = location.state || { from: "/" }
  return <Login onSuccess={() => history.replace(from)} />
}

const NoMatchPage = () => {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export const SiteMap = () => {
  const auth = useContext(AuthContext)
  let AuthButton = () => {
    return auth.user ? (
      <p>
        User: {JSON.stringify(auth.user)}
        <br />
        <button onClick={auth.logout}>Log out</button>
      </p>
    ) : (
      <p>You are not logged in</p>
    )
  }
  return (
    <ul>
      <li>
        <Link to="/public">Public Page</Link>
      </li>
      <li>
        <Link to="/my">Protected Page</Link>
      </li>
      <li>
        <AuthButton />
      </li>
    </ul>
  )
}

const AppPage = () => {
  let left = (
    <Sidebar />
  )

  let right = (
    <Switch>
      <Route path="/my/:workspaceId">
        <Workspace />
      </Route>
      <Route exact path="/my">
        <Dashboard />
      </Route>
      <Route path="/*">
        <NoMatchPage />
      </Route>
    </Switch>
  )

  return (
    <ViewProvider>
      <AppPageLayout left={left} right={right} />
    </ViewProvider>
  )
}