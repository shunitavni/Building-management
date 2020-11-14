import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Tenants from './details';
import CreateTenant from './new';
import UpdateTenant from './update';

export default function TenantsPage({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={Tenants} />
      <Route exact path={`${match.url}/edit/:id`} component={UpdateTenant} />
      <Route exact path={`${match.url}/new`} component={CreateTenant} />
      <Redirect to="/" />
    </Switch>
  );
}
