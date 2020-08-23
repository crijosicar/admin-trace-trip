import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import "./../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import Loader from "../../app/layout/Loader";
import AlertDismissible from "../../app/components/Alerts";
import {
  updateUser,
  updateUserPassword,
  updateUserAvatar,
} from "../../actions/user";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleOnUpdateUser = this.handleOnUpdateUser.bind(this);
    this.handleOnUpdateAvatarUser = this.handleOnUpdateAvatarUser.bind(this);
    this.handleOnUpdatePasswordUser = this.handleOnUpdatePasswordUser.bind(
      this
    );
  }

  state = {
    avatar: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "",
    confirmpassword: "",
    formSubmitted: false,
  };

  static propTypes = {
    onUpdateUser: PropTypes.func.isRequired,
    onUpdateUserPassword: PropTypes.func.isRequired,
    onUpdateUserAvatar: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isUserUpdateInProgress: PropTypes.bool.isRequired,
    isUpdateUserError: PropTypes.any.isRequired,
  };

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  handleOnUpdateUser = (e) => {
    this.props.onUpdateUser(this.props.user._id, {
      firstName: this.state.firstName || this.props.user.firstName,
      lastName: this.state.lastName || this.props.user.lastName,
    });
    this.setState({ formSubmitted: true });
  };

  handleOnUpdateAvatarUser = (e) => {
    e.preventDefault();

    console.log(this.state.avatar);
    // this.props.onUpdateUserAvatar();
  };

  handleOnUpdatePasswordUser = (e) => {
    e.preventDefault();

    console.log(this.state.password);
    console.log(this.state.confirmpassword);

    // this.props.onUpdateUserPassword();
  };

  handleSetShow = (el) => {
    el.show = false;
  };

  render() {
    const {
      isUserUpdateInProgress,
      isUpdatingUserAvatarInProgress,
      isUpdatingUserPasswordInProgress,
      isUpdateUserError,
    } = this.props;

    if (
      isUserUpdateInProgress ||
      isUpdatingUserAvatarInProgress ||
      isUpdatingUserPasswordInProgress
    )
      return <Loader />;

    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <h5>Personal information</h5>
                <hr />
                {this.state.formSubmitted && (
                  <AlertDismissible
                    variant={isUpdateUserError ? "danger" : "success"}
                    message={
                      isUpdateUserError ? isUpdateUserError : "Data updated!"
                    }
                  />
                )}
                <Row>
                  <Col md={6}>
                    <Form>
                      <Form.Group controlId="personalInformationForm.FirstName">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter FirstName"
                          defaultValue={
                            this.state.firstName || this.props.user.firstName
                          }
                          onChange={(v) =>
                            this.handleChange("firstName", v.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="personalInformationForm.Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          readOnly
                          type="email"
                          placeholder="Enter Email"
                          defaultValue={this.props.user.email}
                        />
                        <Form.Text className="text-muted">
                          Please, do not share this email.
                        </Form.Text>
                      </Form.Group>
                      <Button
                        onClick={this.handleOnUpdateUser}
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="personalInformationForm.LastName">
                      <Form.Label>LastName</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter LastName"
                        defaultValue={
                          this.state.lastName || this.props.user.lastName
                        }
                        onChange={(v) =>
                          this.handleChange("lastName", v.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="personalInformationForm.Status">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as="select"
                        disabled
                        defaultValue={this.props.user.status}
                      >
                        <option>ACTIVE</option>
                        <option>INACTIVE</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Avatar</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form>
                      <img
                        width={100}
                        height={120}
                        src={this.props.user.avatar}
                        alt={`${this.props.user.firstName}-${this.props.user.lastName}`}
                      />
                      <Form.Group controlId="avatarForm.avatar">
                        <Form.Label>Profile picture</Form.Label>
                        <Form.File />
                        <Form.Text className="text-muted">
                          This image is for going to be in your profile.
                        </Form.Text>
                      </Form.Group>
                      <Button
                        onClick={this.handleOnUpdateAvatarUser}
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Change Password</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form>
                      <Form.Group controlId="passwordForm.Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter Password"
                          onChange={(v) =>
                            this.handleChange("password", v.target.value)
                          }
                        />
                      </Form.Group>
                      <Button
                        onClick={this.handleOnUpdatePasswordUser}
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <Form>
                      <Form.Group controlId="passwordForm.ConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Re-Enter Password"
                          onChange={(v) =>
                            this.handleChange("confirmpassword", v.target.value)
                          }
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isUserUpdateInProgress: state.user.isUserUpdateInProgress,
  isUpdateUserError: state.user.isUpdateUserError,
  isUpdateUserPasswordError: state.user.isUpdateUserPasswordError,
  isUpdateUserAvatarError: state.user.isUpdateUserAvatarError,
  isUpdatingUserAvatarInProgress: state.user.isUpdatingUserAvatarInProgress,
  isUpdatingUserPasswordInProgress: state.user.isUpdatingUserPasswordInProgress,
});

const mapDispatchToProps = {
  onUpdateUser: updateUser,
  onUpdateUserPassword: updateUserPassword,
  onUpdateUserAvatar: updateUserAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
