import React, { Component } from "react";

import { Link } from "react-router-dom";
import s from "./header.module.scss";

export default class Header extends Component {
  render() {
    return (
      <div className={`${s.header} d-flex`}>
        <h3>
          <Link to="/">Star DB</Link>
        </h3>
        <ul className="d-flex">
          <li>
            <Link to="/people/">People</Link>
          </li>
          <li>
            <Link to="/films/">Films</Link>
          </li>
          <li>
            <Link to="/planets/">Planets</Link>
          </li>
          <li>
            <Link to="/starships/">Starships</Link>
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
