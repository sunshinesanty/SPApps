import {observable} from "mobx"
import {ObservableTodoStore} from "../Store/todoStore"
export interface ITodoEntry{
    id:number;
    Title:string;
    startdate:Date;
    enddate:Date;
    completed:boolean;
    isEdit?:Boolean;
}
export interface ITodoProp{
  tasksHeader: string;
  store:ObservableTodoStore;  
}

export interface ITodoView{  
  todo:ITodoEntry;  
  key: number;
  store:ObservableTodoStore;  
}
export interface INewTodo{
  store: ObservableTodoStore;
  task?:ITodoEntry;
}
export interface INewTodoState{
  Title: string;
  isCompleted:Boolean;
}
export interface INewTaskData{
  newTitle:string;
  taskIsCompleted: boolean;
}
export interface IUpdateTaskData{
  updtTitle:string;
  taskIsCompleted: boolean;
  taskId:number;
}