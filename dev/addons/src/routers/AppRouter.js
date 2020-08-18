import React from 'react'
import { HashRouter, Route } from 'react-router-dom';
import RequestsFilter from '../components/RequestsFilter/RequestsFilter'
import InvalidUrl from '../components/InvalidUrl/InvalidUrl';

const AppRouter = () => (
  <HashRouter>
    <Route path="/requestsfilter" component={RequestsFilter} exact />
    <Route path="/" component={InvalidUrl} exact />
  </HashRouter>
);

export default AppRouter