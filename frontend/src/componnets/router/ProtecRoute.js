import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectRoute = ({component: Component, ...rest}) => {
  const authUser = !!useSelector(state => state.userLogin.userInfo)
  return (
    <Route { ...rest } render={ (props) => (
      authUser
        ? <Component { ...props } />
        : <Redirect to='/login'/>
    ) }/>
  );
};

export default ProtectRoute;
