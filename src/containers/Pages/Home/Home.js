import React, { Component } from "react";
import { Row, Col, Card, Form, Button, Collapse } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { withRouter } from "react-router-dom";
import { concat } from "lodash";
import * as Yup from "yup"

import Aux from "../../../hoc/_Aux";
import DEMO from "../../../store/constant";
import { getPage } from "../../../actions/pages";
import ImageInput from '../../../app/components/ImageInput'

const SlideCard = ({slide, accordionKey, index, onClick, handleOnUpsertSlide}) => {
  const currentIndex = index+1;
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
  ];
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    image: Yup.mixed()
              .required("A file is required")
              .test(
                "fileSize",
                "File too large",
                value => value && value.size <= FILE_SIZE
              )
              .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
              ),
    cta: Yup.string().when('ctaType', (ctaType, schema) => ctaType !== 'N/A' ? schema.required("Required") : schema),
    ctaType: Yup.string().uppercase().required("Required"),
  });

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
              {slide.title || ""}
              </a>
            </Card.Title>
          </Card.Header>
          <Collapse in={accordionKey === currentIndex}>
            <div id={`accordion${currentIndex}`}>
              <Card.Body>
                  <Formik
                    onSubmit={handleOnUpsertSlide}
                    initialValues={slide}
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      isValid,
                      errors,
                      setFieldValue,
                      handleBlur,
                      touched,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Col md={12}>
                          <img
                            height={120}
                            src={values.image}
                          />
                          <Form.Group controlId={`slide${currentIndex}_image`}>
                            <Form.Label>Image</Form.Label>
                            <Field
                              name="image"
                              component={ImageInput}
                              title="Image"
                              setFieldValue={setFieldValue}
                              errorMessage={errors.image ? errors.image : ""}
                              touched={touched.image}
                              onBlur={handleBlur}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group controlId={`slide${currentIndex}_title`}>
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
                          <Form.Group controlId={`slide${currentIndex}_description`}>
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
                          <Form.Group controlId={`slide${currentIndex}_ctaType`}>
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
                          <Form.Group controlId={`slide${currentIndex}_cta`}>
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
                          <Button type="submit" variant="primary">
                            Publish
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

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.addNewSlide = this.addNewSlide.bind(this);
    this.handleOnUpsertSlide =  this.handleOnUpsertSlide.bind(this);
  }

  state = {
    accordionKey: 1,
    sliderList: []
  };

  static propTypes = {
    onGetPage: PropTypes.func.isRequired,
    pages: PropTypes.array,
    isGetPageInProgress: PropTypes.bool.isRequired,
    isGetPageError: PropTypes.any.isRequired,
  };




  componentDidMount() {
    this.props.onGetPage('home');
    const [pageData] = this.getPageData('home');

    pageData && pageData.slider && this.setState({sliderList: pageData.slider})
  }

  handleOnUpsertSlide = (data) => { console.log(data) };

  getPageData = (pageName) => this.props.pages.filter((page) => page.name === pageName);

  addNewSlide = () => this.setState({sliderList: concat(this.state.sliderList, {title: "", description: "", image: "", cta: "", ctaType: "N/A"})});

  render() {
    const { accordionKey, sliderList } = this.state;

    const sliders = sliderList.map((slide, index) => {
      return <SlideCard 
                key={index} 
                slide={slide} 
                accordionKey={accordionKey} 
                index={index} 
                onClick={() =>
                  this.setState({
                    accordionKey: accordionKey !== (index+1) ? (index+1) : 0,
                  })}
                  handleOnUpsertSlide={this.handleOnUpsertSlide}
              />;
    });

    return (
      <Aux>
        <Row>
        <Col sm={12} className="accordion">
            <h5>Principal Banner</h5>
            <hr />
            {sliders}
            <Button  
              onClick={this.addNewSlide} 
              variant="primary">
                Add slide
            </Button>
          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state.pages.pages,
  isGetPageInProgress: state.pages.isGetPageInProgress,
  isGetPageError: state.pages.isGetPageError,
});

const mapDispatchToProps = {
  onGetPage: getPage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
