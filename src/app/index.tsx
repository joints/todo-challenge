import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import { App as AppView } from 'app/views/App';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={AppView} />
  </Switch>
));
