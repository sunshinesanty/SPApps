import * as React from "react";
import * as ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

import { Hello } from "./components/Hello";
import {TodoList} from "./components/TodoCtrl";
import {observableStore} from "./Store/todoStore"

ReactDOM.render(
    <div>
    <DevTools />
    <Hello compiler="TypeScript" framework="React" />
    <TodoList store={observableStore} tasksHeader="My Tasks"  />    
    </div>,
    document.getElementById("example")
);