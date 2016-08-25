import * as React from "react";
import {observer} from "mobx-react";
import {ITodoEntry, ITodoProp, ITodoView} from "../Interfaces/ITodoStore"
import {CreateNewTodo} from "./CreateTodoCtrl";

@observer
export class TodoList extends React.Component<ITodoProp, {}> {
  render() {
    const {filteredTodos, filter, pendingRequests } = this.props.store; 
    return (
      <div>
        { this.props.tasksHeader }
        <ul>
        { filteredTodos.map(
          (todo:ITodoEntry, idx:number) => <TodoView todo={ todo } key={ idx } store={this.props.store} />
        ) }
        </ul>
        { pendingRequests > 0 ? <div>Loading...</div> : null }
        <div>CurrentFilter: <input type="text" value={filter} onChange={this.filetrTodo} /></div><br/><br/>
        
        <CreateNewTodo store={this.props.store} task={this.getEditableTodoID()} />
      </div>
    );
  }

  getEditableTodoID = (): ITodoEntry => {
        const {todos} = this.props.store;
        const editableTodo = todos.filter(todo => todo.isEdit == true);
        if (editableTodo && editableTodo.length > 0)
            return editableTodo[0];
        return null;
    }

  filetrTodo = (e:React.FormEvent) => {
    this.props.store.filter = e.target.value;
  }
}

@observer
export class TodoView extends React.Component<ITodoView, {}> {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
        <input 
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted } 
        />
        { todo.Title }
        { todo.startdate 
          ? <small>{ todo.startdate.toISOString() }</small> 
          : null
        }
        { todo.enddate 
          ? <small>{ todo.enddate.toISOString() }</small> 
          : null
        }
      </li>
    ); 
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    this.props.store.renameTodo(this.props.todo); 
  } 
}

