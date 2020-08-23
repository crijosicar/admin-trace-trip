import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";

const AlertDismissible = ({ variant, message }) => {
  const [show, setShow] = useState(true);

  const titles = {
    success: "Hey, nice to see you",
    primary: "How's it going?!",
    secondary: "How's it going?!",
    danger: "Oh snap! You got an error!",
    warning: "How's it going?!",
  };

  return (
    <Alert show={show} variant={variant}>
      <Alert.Heading>{titles[variant] || "Hey, nice to see you"}</Alert.Heading>
      <p>{message}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant={`outline-${variant}`}>
          Close me y'all!
        </Button>
      </div>
    </Alert>
  );
};

export default AlertDismissible;
