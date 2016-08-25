import {observable, autorun, computed} from 'mobx';
import {ITodoEntry, INewTaskData, IUpdateTaskData} from "../Interfaces/ITodoStore"
export class ObservableTodoStore {
    public todos = observable<ITodoEntry>([
		{
			Title: "Test Todos",
			startdate: new Date(),
			enddate: new Date(),
			completed: false,
			isEdit: false,
			id: Math.random()
		},
		{
			Title: "Say Hurray",
			startdate: new Date(),
			enddate: new Date(),
			completed: false,
			isEdit: false,
			id: Math.random()
		}
	]);
	@observable public filter = "";
    @observable public pendingRequests = 0;

    constructor() {
        autorun(() => {
			console.log(this.todos[0].Title);
			console.log(this.filter);
		});
    }

	@computed get filteredTodos() {
		const matchFilter = new RegExp(this.filter, "i");
		return this.todos.filter(todos => !this.filter || matchFilter.test(todos.Title));
	}

	@computed get completedTodosCount() {
		return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	@computed get report() {
		if (this.todos.length === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].Title}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	addTodo(NewTaskData: INewTaskData) {
		const startdate: Date = new Date();
		const enddate: Date = new Date(startdate.setDate(startdate.getDate() + 2));
		const task: ITodoEntry = {
			id: Math.random(),
			Title: NewTaskData.newTitle,
			startdate,
			enddate,
			isEdit: false,
			completed: NewTaskData.taskIsCompleted
		}
		this.todos.push(task);
	}

	updateTodo(UpdateTaskData: IUpdateTaskData) {
		//get the todo to be editable and set the isEdit to true
		const replacedTodo: ITodoEntry[] = [];
		this.todos.forEach(todo => replacedTodo.push(todo));
		const selectedItem: ITodoEntry[] = replacedTodo.filter(todo => todo.id == UpdateTaskData.taskId);
		if (selectedItem) {
			let indexToEdit = replacedTodo.indexOf(selectedItem[0]);
			if (indexToEdit > -1) {
				replacedTodo[indexToEdit].Title = UpdateTaskData.updtTitle;
				replacedTodo[indexToEdit].completed = UpdateTaskData.taskIsCompleted;
				replacedTodo[indexToEdit].isEdit = false;
			}
		}
		this.todos.replace(replacedTodo);
	}

	renameTodo(task: ITodoEntry) {
		//set all todo to be noneditable
		const replacedTodo: ITodoEntry[] = [];
		this.todos.forEach(todo => {
			todo.isEdit = false;
			replacedTodo.push(todo)
		});
		let indexToEdit = -1;
		//get the todo to be editable and set the isEdit to true
		const selectedItem: ITodoEntry[] = replacedTodo.filter(todo => todo.id == task.id);
		if (selectedItem) {
			indexToEdit = replacedTodo.indexOf(selectedItem[0]);
			if (indexToEdit > -1) {
				replacedTodo[indexToEdit].isEdit = true;
			}
		}
		this.todos.replace(replacedTodo);
	}
}
var tStore: any;

export const observableStore = tStore = new ObservableTodoStore();