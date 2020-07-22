import React, { Component } from "react";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

export default class Messages extends Component {
  render() {
    return (
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position={"top-right"}
        transitionIn={"fadeIn"}
        transitionOut={"fadeOut"}
        progressBar
      />
    );
  }
}
