import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './firebase/config';
import Login from "./components/login";
import AppProvider from './context/AppProvider';
import AuthProvider, { AuthContext } from './context/AuthProvider';
import ViewProvider from './context/ViewProvider';
import { Redirect } from 'react-router-dom';
import Sidebar from 'components/sidebar/Sidebar.container';
import Dashboard from './components/home/dashboard/Dashboard';
import Workspace from './components/home/Workspace';
import AppPageLayout from './components/layout/AppPageLayout';
import PageNotFound from './components/layout/PageNotFound'

export default function SecondApp() {
  return (
    <AuthProvider>
      <Router>
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
            <Login />
          </Route>
          <Route path="*">
            <PageNotFound />
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
        <PageNotFound />
      </Route>
    </Switch>
  )

  return (
    <ViewProvider>
      <AppPageLayout left={left} right={right} />
    </ViewProvider>
  )
}