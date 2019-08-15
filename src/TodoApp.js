import React from 'react';
import {view as Todos} from './todos';
import {view as Filter} from './filter';
import "./style.scss";

function TodoApp() {
    return (
        <div className="todo-app">
            <h2>Todo List</h2>
            <Todos />
            <Filter />
        </div>
    );
}

export default TodoApp;