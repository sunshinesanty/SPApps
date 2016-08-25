import * as React from "react";
import {observer} from "mobx-react";
import {INewTodo, ITodoEntry, INewTodoState} from "../Interfaces/ITodoStore";

@observer
export class CreateNewTodo extends React.Component<INewTodo, {}>
{
    public Title: string = "";
    public isCompleted: boolean = false;
    constructor(props: INewTodo) {
        super(props);
        const {task} = this.props;
        if (task && task.id > 0) {
            this.Title = task.Title;
            this.isCompleted = task.completed;
        }
    }
    render() {
        const {task} = this.props;

        return (<div>
            <div>Title: <input type="text" onChange={this.taskTitleChange} value={ (task && task.id > 0) ? task.Title : this.Title}/></div>
            <div>Is Completed?<input type="radio" onChange={this.taskIsCmpltChange} value={(task && task.id > 0) ? task.completed : this.isCompleted}/></div>
            <div><button onClick={ this.onNewTodo }>New Todo</button><small> (double-click a todo to edit) </small></div>
        </div>)
    };

    taskTitleChange = (e: React.FormEvent) => {
        this.props.task.Title = e.target.value;
        this.Title = e.target.value;
    }

    taskIsCmpltChange = (e: React.FormEvent) => {
        this.props.task.completed = e.target.value as boolean;
        this.isCompleted = e.target.value as boolean;
    }

    onNewTodo = () => {
        const {task} = this.props;
        const isCompleted = this.isCompleted as boolean;
        if (task && task.id > 0) {
            this.props.store.updateTodo({
                taskId: task.id,
                taskIsCompleted: isCompleted,
                updtTitle: this.Title
            });
        }
        else {
            this.props.store.addTodo({ newTitle: this.Title, taskIsCompleted: isCompleted });
        }
    }
}