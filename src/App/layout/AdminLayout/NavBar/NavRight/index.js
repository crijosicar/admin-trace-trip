import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import { clearAccessToken } from "../../../../../actions/signin";
import { getUser } from "../../../../../actions/user";

class NavRight extends Component {
  constructor(props) {
    super(props);

    this.handleOnLogout = this.handleOnLogout.bind(this);
  }

  state = {
    listOpen: false,
  };

  componentDidMount = () => this.props.onGetUser();

  handleOnLogout = () => this.props.onLogout();

  render() {
    const { user } = this.props;

    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img
                    height={40}
                    src={user.avatar}
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <a
                    href={DEMO.BLANK_LINK}
                    className="dud-logout"
                    title="Logout"
                    onClick={() => this.handleOnLogout()}
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <a href={"/profile"} className="dropdown-item">
                      <i className="feather icon-user" /> Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href={DEMO.BLANK_LINK}
                      className="dropdown-item"
                      onClick={() => this.handleOnLogout()}
                    >
                      <i className="feather icon-unlock" /> Log out
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.user });

const mapDispatchToProps = {
  onLogout: clearAccessToken,
  onGetUser: getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRight);
