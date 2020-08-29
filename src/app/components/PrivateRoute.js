import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

import { clearAccessToken } from "../../actions/signin";
import { clearUser } from "../../actions/user";
import { getAccessToken } from "../../api/api";

const PrivateRoute = ({ component: Component, accessToken, ...rest }) => {

  if (accessToken) {
    let tokenExpiration = jwtDecode(accessToken).exp;
    let dateNow = new Date();

    if (tokenExpiration < dateNow.getTime() / 1000) {
      rest.onClearAccessToken();
      rest.onClearUser();
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !accessToken ? <Redirect to="/auth/signin" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({ ...state.signin });

const mapDispatchToProps = {
  onClearAccessToken: clearAccessToken,
  onClearUser: clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
