import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup"

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
    formUpdateUserSubmitted: false,
    formUpdateUserAvatarSubmitted: false,
    formUpdateUserPasswordSubmitted: false,
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

  handleOnUpdateUser = () => {
    this.props.onUpdateUser(this.props.user._id, {
      firstName: this.state.firstName || this.props.user.firstName,
      lastName: this.state.lastName || this.props.user.lastName,
    });
    this.setState({ formUpdateUserSubmitted: true });
  };

  handleOnUpdateAvatarUser = () => {
    const formData = new FormData();
    formData.append("avatar", this.state.avatar, this.state.avatar.name);

    this.props.onUpdateUserAvatar(this.props.user._id, formData);
    this.setState({ formUpdateUserAvatarSubmitted: true });
  };

  handleOnUpdatePasswordUser = ({ password }) => {
    this.props.onUpdateUserPassword(this.props.user._id, {
      password,
    });
    this.setState({ formUpdateUserPasswordSubmitted: true });
  };

  render() {
    const {
      isUserUpdateInProgress,
      isUpdatingUserAvatarInProgress,
      isUpdatingUserPasswordInProgress,
      isUpdateUserError,
      isUpdateUserAvatarError,
      isUpdateUserPasswordError,
    } = this.props;

    const validationSchema = Yup.object().shape({
      password: Yup
       .string()
       .min(8)
       .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
       .required(),
      confirmPassword: Yup
       .string()
       .required()
       .oneOf(
       [Yup.ref('password'), null],
        'Passwords must match',
      ),
   })

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
                {this.state.formUpdateUserSubmitted && (
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
                {this.state.formUpdateUserAvatarSubmitted && (
                  <AlertDismissible
                    variant={isUpdateUserAvatarError ? "danger" : "success"}
                    message={
                      isUpdateUserAvatarError
                        ? isUpdateUserAvatarError
                        : "Avatar updated!"
                    }
                  />
                )}
                  <Col md={12}>
                    <Form>
                      <img
                        height={120}
                        src={this.props.user.avatar}
                        alt={`${this.props.user.firstName}-${this.props.user.lastName}`}
                      />
                      <Form.Group controlId="avatarForm.avatar">
                        <Form.Label>Profile picture</Form.Label>
                        <Form.File
                          onChange={(e) =>
                            this.handleChange("avatar", e.target.files[0])
                          }
                        />
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
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Change Password</Card.Title>
              </Card.Header>
              <Card.Body>
                {this.state.formUpdateUserPasswordSubmitted && (
                  <AlertDismissible
                    variant={isUpdateUserPasswordError ? "danger" : "success"}
                    message={
                      isUpdateUserPasswordError
                        ? isUpdateUserPasswordError
                        : "Password updated!"
                    }
                  />
                )}
                  <Formik
                    onSubmit={this.handleOnUpdatePasswordUser}
                    initialValues={{
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      isValid,
                      errors,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit} md={12}>
                        <Col md={6}>
                          <Form.Group controlId="passwordForm.Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              isValid={touched.password && !errors.password}
                              isInvalid={!!errors.password}
                              placeholder="Enter Password"
                              aria-describedby="passwordHelpBlock"
                            />{" "}
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                            <Form.Text id="passwordHelpBlock" muted>
                              Your password must be 8-20 characters long,
                              contain letters and numbers, and must not contain
                              spaces, special characters, or emoji.
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="passwordForm.ConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              isValid={
                                touched.confirmPassword &&
                                !errors.confirmPassword
                              }
                              isInvalid={!!errors.confirmPassword}
                              placeholder="Re-Enter Password"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Button type="submit" variant="primary">
                            Submit
                          </Button>
                        </Col>
                      </Form>
                    )}
                  </Formik>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
