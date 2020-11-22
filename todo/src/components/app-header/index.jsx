import React from "react";
import s from "./app-header.module.scss";

const AppHeader = ({ toDo, done }) => {
  return (
    <div className={`${s["app-header"]} d-flex`}>
      <h1>Todo List</h1>
      <h2>
        {toDo} more to do, {done} done
      </h2>
    </div>
  );
};

export default AppHeader;
