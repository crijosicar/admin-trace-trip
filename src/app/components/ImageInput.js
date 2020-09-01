import React, { useState } from "react";
import { Form } from "react-bootstrap";


const ImageInput = props => {
  const [fileName, setFileName] = useState("");

  const handleVideoChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    
    if (file) {
      reader.onloadend = () => setFileName(file.name);
      reader.readAsDataURL(file);
      props.setFieldValue(props.field.name, file);
    }
  };

  return (<Form.File onChange={handleVideoChange} />);
};

export default ImageInput;