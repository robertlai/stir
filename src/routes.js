import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import RegisterView from 'views/RegisterView';

const Routes = (
	<Router history={browserHistory}>
		<Route path="/register" component={RegisterView} />
	</Router>
);

export default Routes;
