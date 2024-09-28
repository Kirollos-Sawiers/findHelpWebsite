import React from "react";
import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <div className="flex justify-center align-middle items-center h-96">
      <Spinner animation="border" variant="warning" />
    </div>
  );
}

export default LoadingSpinner;