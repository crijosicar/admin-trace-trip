import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Loader from "../../../app/layout/Loader";
import { authenticateUser } from "../../../actions/signin";
import { getAccessToken } from "../../../api/api";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    accessToken: PropTypes.string,
    isAuthError: PropTypes.bool.isRequired,
    isAuthInProgress: PropTypes.bool.isRequired,
  };

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  handleSubmit = (e) => {
    const { email, password } = this.state;

    if (email && password) {
      this.props.onLogin({
        email,
        password,
      });
    }
  };

  renderRedirect = () => {
    const accessToken = getAccessToken();

    if (accessToken && this.props.accessToken)
      return <Redirect to="/dashboard" />;
  };

  render() {
    const { isAuthInProgress } = this.props;

    if (isAuthInProgress) return <Loader />;

    return (
      <Aux>
        {this.renderRedirect()}
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
                    onChange={(v) => this.handleChange("email", v.target.value)}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    onChange={(v) =>
                      this.handleChange("password", v.target.value)
                    }
                  />
                </div>
                <button
                  disabled={!this.state.email || !this.state.password}
                  onClick={() => this.handleSubmit()}
                  className="btn btn-primary shadow-2 mb-4"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.signin.accessToken,
  isAuthError: state.signin.isAuthError,
  isAuthInProgress: state.signin.isAuthInProgress,
});

const mapDispatchToProps = {
  onLogin: authenticateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
