import React, { Component } from "react";
import s from "./item-add-form.module.scss";

export default class ItemAddForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form className={`${s["item-add-form"]} d-flex`} onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          value={this.state.label}
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
        />
        <button type="submit" className="btn btn-outline-secondary">
          Add item
        </button>
      </form>
    );
  }
}
