import { createMachine, assign } from "xstate";

import { getTodos, Todo } from "../api";
import { todoCreateMachine } from "./todoCreateMachine";

export const TODO_EVENT_CREATE = "todo.create";
export const TODO_EVENT_EDIT = "todo.edit";

export const TODO_STATE_LOADING = "LOADING";
export const TODO_STATE_LOADED = "LOADED";
export const TODO_STATE_CREATE = "CREATE";

type Context = {
	todos: Todo[];
};

type Events = {
	type: typeof TODO_EVENT_CREATE;
	value: string;
};

type Services = {
	loadToDos: { data: Awaited<ReturnType<typeof getTodos>> };
};

export const todosMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUDoAyB5AggCICSAcgOIDEGAdmJgJY0BuqA1vTMgCrqqwBtAAwBdRKAAO-Bsgaoa4kAA9EAVgDsATkyqAHEKEBGTUIBMAZiGqALKoA0IAJ6IAtNYBsmdxdPXd7411zD3cAX1CHNAwcAhIKSjAAJ0TURMwJABsAQ2QAM1SAW0wuXgxBUUUpWBk5BSRlRHNdQx1rTWtfVUN1dV1rdQdnBFNdbT11dwm9A3VDXXDIvhiiAFFCSiisAGNEsBywYTF6qpr5RRUEVS6vazbuzXd2w1NNQcbDVUw+92DTAMN3AZTOEIiAaOg4IpNpVpLIzvULiZMOYPppTADHnpzBM3ggXIZzOZMO0Aj8+r1NOZNAsQJtlnFyDDqnC6qALgTdMjUej3JigjinI1rJgzF1Hn8zJNvDS6XhVoQmadWQ0EIDTF9Jj1pnNZq9BcNbJhrJZNCYhLZVEIJjKlgBhABKK3w3BWipZ5zUwWRAU03S6GmNhlx2O0aKEgNmpitvJBoSAA */
		id: "todo",

		tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,

		context: {
			todos: [],
		},

		schema: {
			context: {} as Context,
			events: {} as Events,
			services: {} as Services,
		},

		initial: TODO_STATE_LOADING,

		states: {
			[TODO_STATE_LOADING]: {
				description: "Initial step.",
				invoke: {
					id: "getTodos",
					src: "loadToDos",
					onDone: { actions: "setTodos", target: TODO_STATE_LOADED },
					onError: { actions: "setError" },
				},
			},

			[TODO_STATE_LOADED]: {
				on: {
					[TODO_EVENT_CREATE]: { target: TODO_STATE_CREATE },
				},
			},

			[TODO_STATE_CREATE]: {
				invoke: {
					id: todoCreateMachine.id,
					src: todoCreateMachine,
					onDone: {
						target: TODO_STATE_LOADED,
						actions: (_, event) => {
							console.log("Todo creation done:", event.data);
						},
					},
				},
			},
		},
	},
	{
		actions: {
			setTodos: assign({
				todos: (_, event) => event.data,
			}),
			setError: () => {},
		},
		services: {
			loadToDos: async () => await getTodos(),
		},
	},
);
