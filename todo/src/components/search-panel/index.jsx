import React, { Component } from "react";
import s from "./search-panel.module.scss";

export default class SearchPanel extends Component {
  state = {
    term: "",
  };

  onChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <input
        type="text"
        className={`form-control ${s["search-input"]}`}
        placeholder="Type to search..."
        value={this.state.term}
        onChange={this.onChange}
      />
    );
  }
}
