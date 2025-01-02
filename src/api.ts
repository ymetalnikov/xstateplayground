export type Todo = {
	id: string;
	text: string;
	completed: boolean;
};

let todos = [
	{ id: "1", text: "Take bins out", completed: false },
	{ id: "2", text: "Do laundry", completed: false },
	{ id: "3", text: "Walk the dog", completed: false },
	{ id: "4", text: "Buy groceries", completed: false },
	{ id: "5", text: "Cook dinner", completed: false },
];

export function getTodos(): Promise<Todo[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(todos);
		}, 1000);
	});
}

export function updTodos(item: Todo) {
	return new Promise((resolve) => {
		setTimeout(() => {
			todos = todos.map((todo) => (todo.id === item.id ? item : todo));
			resolve(void 0);
		}, 1000);
	});
}

export function delTodos(id: string) {
	return new Promise((resolve) => {
		setTimeout(() => {
			todos = todos.filter((todo) => todo.id !== id);
			resolve(void 0);
		}, 1000);
	});
}

export type CrtTodosParams = Omit<Todo, "id">

export function crtTodos(item: CrtTodosParams) {
	return new Promise((resolve) => {
		setTimeout(() => {
			todos.push({
				id: (todos.length + 1).toString(),
				...item,
			});
			resolve(void 0);
		}, 1000);
	});
}
