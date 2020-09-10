import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { concat, find, orderBy } from "lodash";

import Aux from "../../../hoc/_Aux";
import { getPage, updatePage } from "../../../actions/pages";
import SlideCard from "../../../app/components/SliderCard";


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.addNewSlide = this.addNewSlide.bind(this);
    this.handleOnUpsertSlide = this.handleOnUpsertSlide.bind(this);
    this.handleOnDeleteSlide = this.handleOnDeleteSlide.bind(this);
  }

  state = {
    accordionKey: 1,
    sliderList: [],
  };

  static propTypes = {
    onGetPage: PropTypes.func.isRequired,
    pages: PropTypes.array,
    isGetPageInProgress: PropTypes.bool.isRequired,
    isGetPageError: PropTypes.any.isRequired,
  };

  componentDidMount() {
    this.props.onGetPage('home');
    const pageData = find(this.props.pages, {"name": "home"});

    if(pageData && pageData.additionalFields.slider){
      const sliderList = orderBy(pageData.additionalFields.slider, ['position'],['asc']);

      this.setState({sliderList});
    } 
  }

  handleOnUpsertSlide = ({ image, ...extraFormFields }) => {     
    const formData = new FormData();  

    Object.entries(extraFormFields).map(([fieldName, value]) => formData.append(`additionalFields[slider][${fieldName}]`, value)); 
    image && image[0].file && formData.append("additionalFields[slider][image]", image[0].file, `${image[0].name}_${image[0].file.name}`);
    
    this.props.onUpdatePage("home", formData);
  };

  handleOnDeleteSlide = (formFields) => {     
    // const formData = new FormData();
    console.log(formFields);  
    
    // this.props.onUpdatePage("home", formData);
  };


  addNewSlide = () => {
    const position = this.state.sliderList.length + 1;
    const defaultSlide =  {title: "", description: "", image: "", cta: "", ctaType: "N/A", visible: true, position };

    this.setState({sliderList: concat(this.state.sliderList, defaultSlide), accordionKey: position});
  } 

  render() {
    const { accordionKey, sliderList, isUpdatePageInProgress } = this.state;

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
                  onUpsertSlide={this.handleOnUpsertSlide}
                  onDeleteSlide={this.handleOnDeleteSlide}
                  isUpdatePageInProgress={isUpdatePageInProgress}
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
  isUpdatePageInProgress:  state.pages.isUpdatePageInProgress,
});

const mapDispatchToProps = {
  onGetPage: getPage,
  onUpdatePage: updatePage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
