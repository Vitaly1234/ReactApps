import React, { Component } from "react";

import s from "./header.module.scss";

export default class Header extends Component {
  render() {
    return (
      <div className={`${s.header} d-flex`}>
        <h3>
          <span>Star DB</span>
        </h3>
        <ul className="d-flex">
          <li>
            <a href="#">People</a>
          </li>
          <li>
            <a href="#">Planets</a>
          </li>
          <li>
            <a href="#">Starships</a>
          </li>
        </ul>

        <button
          onClick={this.props.onServiceChange}
          className="btn btn-primary btn-sm"
        >
          Change Service
        </button>
      </div>
    );
  }
}
