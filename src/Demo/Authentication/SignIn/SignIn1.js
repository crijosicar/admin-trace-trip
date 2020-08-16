import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";

class SignUp1 extends Component {
  constructor(props) {
    super(props);

    this.state = { isAuthenticated: false };
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("access_token");

    if (token) {
      const tokenExpiration = jwtDecode(token).exp;
      const dateNow = new Date();

      if (tokenExpiration < dateNow.getTime() / 1000) {
        this.setState({
          isAuthenticated: false,
        });
      } else {
        this.setState({
          isAuthenticated: true,
        });
      }
    } else {
      this.setState({
        isAuthenticated: false,
      });
    }
  }

  onLogin = (e) => {
    e.preventDefault();
    console.log("The link was clicked.");
  };

  render() {
    return this.state.isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Aux>
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input
                      type="checkbox"
                      name="checkbox-fill-1"
                      id="checkbox-fill-a1"
                    />
                    <label htmlFor="checkbox-fill-a1" className="cr">
                      {" "}
                      Save credentials
                    </label>
                  </div>
                </div>
                <button
                  onClick={this.onLogin}
                  className="btn btn-primary shadow-2 mb-4"
                >
                  Login
                </button>
                <p className="mb-2 text-muted">
                  Forgot password?{" "}
                  <NavLink to="/auth/reset-password-1">Reset</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
