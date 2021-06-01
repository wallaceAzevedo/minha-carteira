import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SigIn from '../pages/SignIn'

const AuthRoutes: React.FC = () => (
   <Switch>
      <Route path="/" component={SigIn}/>
   </Switch>
);

export default AuthRoutes;