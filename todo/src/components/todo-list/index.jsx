import React from "react";
import TodoListItem from "./../todo-list-item";
import s from "./todo-list.module.scss";

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  return (
    <ul className={`list-group ${s["todo-list"]}`}>
      {todos.map((item) => {
        const { id, ...itemProps } = item;
        return (
          <li key={id} className={`list-group-item ${s["todo-list-item"]}`}>
            <TodoListItem
              {...itemProps}
              onDeleted={() => onDeleted(id)}
              onToggleImportant={() => onToggleImportant(id)}
              onToggleDone={() => onToggleDone(id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
