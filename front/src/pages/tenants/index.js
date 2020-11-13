import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Tenants from './details';

export default function TenantsPage({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={Tenants} />
      <Redirect to="/" />
    </Switch>
  );
}
