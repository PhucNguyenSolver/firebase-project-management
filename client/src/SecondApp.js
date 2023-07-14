import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './firebase/config';

import AuthProvider, { AuthContext } from 'context/AuthProvider';
import AppProvider from 'context/AppProvider';
import ViewProvider from 'context/ViewProvider';

import { HStack } from 'components/layout/AppLayout';
import Sidebar from 'components/sidebar';
import Login from "components/login";
import Workspace from 'components/home/Workspace';
import Dashboard from 'components/home/dashboard/Dashboard';
import PageNotFound from 'components/layout/PageNotFound'


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
              <ViewProvider>
                <App />
              </ViewProvider>
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

function App() {
  return (
    <HStack
      left={<Sidebar />}
      right={<>
        <Switch>
          <Route path="/my/:workspaceId">
            <Workspace />
          </Route>
          <Route exact path="/my">
            <Dashboard />
          </Route>
        </Switch>
      </>}
    />
  )
}