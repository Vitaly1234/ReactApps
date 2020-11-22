import React, { Component } from "react";
import s from "./todo-list-item.module.scss";
import cx from "classnames";

export default class TodoListItem extends Component {
  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      important,
      done,
    } = this.props;

    return (
      <span
        className={cx(s["todo-list-item"], {
          [s.done]: done,
          [s.important]: important,
        })}
      >
        <span onClick={onToggleDone} className={s["todo-list-item-label"]}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
