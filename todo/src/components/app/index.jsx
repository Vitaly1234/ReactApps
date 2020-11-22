import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import s from "./app.module.scss";
import ItemAddForm from "../item-add-form";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    term: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((e) => e.id === id);
      return {
        todoData: [...todoData.slice(0, i), ...todoData.slice(i + 1)],
      };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createTodoItem(text)],
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const i = arr.findIndex((e) => e.id === id);

    const oldItem = arr[i];

    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, i), newItem, ...arr.slice(i + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  search(items, term) {
    return term.length === 0
      ? items
      : items.filter((item) =>
          item.label.toLowerCase().includes(term.toLowerCase())
        );
  }

  filter(items, filter) {
    switch (filter) {
      case "active":
        return items.filter((e) => !e.done);
      case "done":
        return items.filter((e) => e.done);
      default:
        return items;
    }
  }

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const todoDataView = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((e) => e.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className={s["todo-app"]}>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className={`${s["top-panel"]} d-flex`}>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={todoDataView}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
