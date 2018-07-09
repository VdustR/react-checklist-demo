import React from 'react';
import { Route, Switch } from 'react-router';
import ApiDocument from './ApiDocument';
import Demo from './Demo';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ApiDocument} />
    <Route path="/demo" component={Demo} />
  </Switch>
);

export default Routes;
