import React from 'react';
import { Route } from 'react-router';

// Testing website
import MarvinTest from '/imports/console/ui/testPages/MarvinTest.jsx';
import TestPage from '/imports/console/ui/testPages/AFTest';

const TestRoutes = (
  <Route path="test">
    <Route path="marvin" component={MarvinTest} />
    <Route path="aftest" component={TestPage} />
  </Route>
);

export default TestRoutes;
