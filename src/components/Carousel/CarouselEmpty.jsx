import React, { Component } from "react";

class CarouselEmpty extends Component {
  state = {};
  formatListType = listType => {
    switch (listType) {
      case "6":
        return "Plan To Watch";
      case "1":
        return "Currently Watching";
      case "2":
        return "Completed";
      case "4":
        return "Dropped";
      case "3":
        return "On Hold";
      default:
        return "Select list type";
    }
  };
  render() {
    return (
      <div className="error-message-container">
        <h1 className="error-header">
          The "{this.formatListType(this.props.listType)}" List of{" "}
          {this.props.username} is empty.
        </h1>
        <h4 className="error-subheading">
          {this.props.username} must have at least one anime in "
          {this.formatListType(this.props.listType)}".
        </h4>
      </div>
    );
  }
}

export default CarouselEmpty;
