import React from "react";
import { Col, Card, Form, Button, Collapse, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isString } from "lodash";

import Thumb from './Thumbnail';
import DEMO from "../../store/constant";

const SlideCard = ({slide, accordionKey, index, onClick, onUpsertSlide, onDeleteSlide, isUpdatePageInProgress}) => {
    const currentIndex = index + 1;
    let validationSchema = Yup.object({
      title: Yup.string(),
      description: Yup.string(),
      cta: Yup.string().when('ctaType', {
        is: value => value !== 'N/A',
        then: Yup.string().required(),
        otherwise: Yup.string().matches(/^$/, "Must be an empty string")
      }),
      ctaType: Yup.string().uppercase().required(),
      visible: Yup.boolean().required(),
      position: Yup.number().positive().required(),
    });

    if(!slide.image) {
        validationSchema = validationSchema.shape({
            image: Yup.array()
            .of(Yup.object({
                name: Yup.string().required(),
                file: Yup.mixed().required(),
              }),
            ).required("image is a required field")
         })
    }
        
    return <Card className="mt-2"> 
            <Card.Header>
              <Card.Title as="h5">
                <a
                  href={DEMO.BLANK_LINK}
                  onClick={onClick}
                  aria-controls={`accordion${currentIndex}`}
                  aria-expanded={accordionKey === currentIndex}
                >
                Slide #{currentIndex}
                </a>
              </Card.Title>
            </Card.Header>
            <Collapse in={accordionKey === currentIndex}>
              <div id={`accordion${currentIndex}`}>
                <Card.Body>
                    <Formik
                      onSubmit={onUpsertSlide}
                      initialValues={slide}
                      validationSchema={validationSchema}
                      validateOnBlur={true}
                      enableReinitialize={true}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        setFieldValue,
                        touched,
                        isValid,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Col md={12}>
                            {isString(values.image) && <Thumb file={values.image} alt={`slide_${currentIndex}_image`}/>}
                            <Form.Group controlId={`slide_${currentIndex}_image`}>
                              <Form.Label>Image</Form.Label>
                              <Form.Control
                                type="file"
                                name="image" 
                                isValid={touched.image && !errors.image}
                                isInvalid={!!errors.image}
                                className={
                                    errors.image && touched.image
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                                }
                                onChange={(e) =>
                                    setFieldValue("image", [{name: e.currentTarget.files[0] ? `slide_${currentIndex}_image` : undefined, file: e.currentTarget.files[0]}])
                                }
                              />{" "}
                              <Form.Control.Feedback type="invalid">
                                image is a required field
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId={`slide_${currentIndex}_title`}>
                              <Form.Label>Position</Form.Label>
                              <Form.Control
                                type="number"
                                name="position"
                                value={values.position}
                                onChange={handleChange}
                                isValid={touched.position && !errors.position}
                                isInvalid={!!errors.position}
                                placeholder="Enter Position"
                              />{" "}
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                {errors.position}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId={`slide_${currentIndex}_title`}>
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                placeholder="Enter Title"
                              />{" "}
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                {errors.title}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId={`slide_${currentIndex}_description`}>
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows="3" 
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                isValid={
                                  touched.description &&
                                  !errors.description
                                }
                                isInvalid={!!errors.description}
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                {errors.description}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId={`slide_${currentIndex}_ctaType`}>
                              <Form.Label>CTA Type</Form.Label>
                              <Form.Control 
                                as="select" 
                                className="mb-3"                               
                                value={values.ctaType}
                                name="ctaType"
                                onChange={handleChange}
                                isValid={touched.ctaType && !errors.ctaType}
                                isInvalid={!!errors.ctaType}
                              > {" "}
                                <option value="N/A">N/A</option>
                                <option value="LINK">Link</option>
                                <option value="POPUP">PopUp</option>
                              </Form.Control>
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                {errors.ctaType}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId={`slide_${currentIndex}_cta`}>
                              <Form.Label>CTA</Form.Label>
                              <Form.Control
                                type="text"
                                name="cta"
                                value={values.cta}
                                onChange={handleChange}
                                isValid={touched.cta && !errors.cta}
                                isInvalid={!!errors.cta}
                                placeholder="Enter CTA"
                              />{" "}
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                {errors.cta}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId={`slide_${currentIndex}_visible`}>
                              <Form.Label>Visible</Form.Label>
                              <Form.Control 
                                as="select" 
                                className="mb-3"                               
                                value={values.visible}
                                name="visible"
                                onChange={handleChange}
                                isValid={touched.visible && !errors.visible}
                                isInvalid={!!errors.visible}
                              > {" "}
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </Form.Control>
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                {errors.visible}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Button variant="primary" type="submit" disabled={isUpdatePageInProgress || !isValid}>
                                { (isUpdatePageInProgress) && <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}
                                { (isUpdatePageInProgress) ?  "Publishing..." : "Publish" }
                            </Button>
                            <Button onClick={onDeleteSlide} variant="danger" disabled={isUpdatePageInProgress}>
                                { isUpdatePageInProgress && <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}
                                { isUpdatePageInProgress ? "Deleting..." : "Delete" }
                            </Button>
                          </Col>
                        </Form>
                      )}
                    </Formik>
                </Card.Body>
              </div>
            </Collapse>
          </Card>;
  };

export default withRouter(connect((state) => (state), {})(SlideCard));