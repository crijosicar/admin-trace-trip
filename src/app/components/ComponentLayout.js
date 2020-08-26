import React from "react";
import PrivateRoute from "./PrivateRoute";
import { Route } from "react-router-dom";

const ComponentLayout = (route, index) => {
  return route.isPrivate ? (
    <PrivateRoute
      key={index}
      path={route.path}
      exact={route.exact}
      name={route.name}
      component={route.component}
    />
  ) : (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      name={route.name}
      render={(props) => <route.component {...props} />}
    />
  );
};

export default ComponentLayout;
