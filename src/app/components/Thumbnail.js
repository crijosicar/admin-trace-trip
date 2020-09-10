import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Thumb = ({file, alt}) => {
    return (file ? <img alt={alt} src={file} height={200} /> : null);
}

export default withRouter(connect((state) => (state), {})(Thumb));