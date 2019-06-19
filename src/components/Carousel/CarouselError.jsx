import React, { Component } from "react";

class CarouselFail extends Component {
  state = {};
  render() {
    return (
      <div className="error-message-container">
        <h1 className="error-header">
          The username "{this.props.username}" has not been found.
        </h1>
        <h4 className="error-subheading">
          Make sure the username you have entered is verified at MyAnimeList.
        </h4>
      </div>
    );
  }
}

export default CarouselFail;
