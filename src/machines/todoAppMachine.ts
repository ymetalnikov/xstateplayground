import { createMachine, assign } from "xstate";

import { getTodos, Todo } from "../api";
import { todoCreateMachine } from "./todoCreateMachine";

export const TODO_EVENT_CREATE = "todo.create";
export const TODO_EVENT_EDIT = "todo.edit";

export const TODO_STATE_LOADING = "LOADING";
export const TODO_STATE_LOADED = "LOADED";
export const TODO_STATE_CREATE = "CREATE";

type Context = {
  todos: Todo[] | null;
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
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUDoAyB5AggCICSAcgOIDEGAdmJgJY0BuqA1vTMgCrqqwBtAAwBdRKAAO-Bsgaoa4kAA9EQgDQgAnqoC+OjWgw4CJCpTAAnC6guYJAGwCGyAGY2Atpi68Mg0YqlYGTkFJGVVDW0EIT19EBp0OEVDVADpWXlFFQQAWgBmACYAFkwATgA2coBGPIB2KqqCqoBWWtrmyMQcgA5azEKC0pqi0u7mqqK8qr0DPmMiMnI0oIzQ0Gycgtryssqa+saWto6tRCqhPLKL8oLmvJvy5sfpuJT5wgBRQmXgzLCNgpCbqYIrlIRbbrdApggrdUq1ToIPJAzDdKrlIpCSalQp3IqxHRAA */
    id: "todo",

    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,

    context: {
      todos: null,
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
          onDone: [
            {
              actions: "setTodos",
              target: TODO_STATE_LOADED,
            },
          ],
          onError: [
            {
              actions: "setError",
            },
          ],
        },
      },

      [TODO_STATE_LOADED]: {
        on: {
          [TODO_EVENT_CREATE]: {
            target: TODO_STATE_CREATE,
          },
        },
      },

      [TODO_STATE_CREATE]: {
        invoke: {
          id: todoCreateMachine.id,
          src: todoCreateMachine,
        },
      },
    },
  },
  {
    actions: {
      setTodos: assign({
        todos: (_, event) => {
          console.log(event);
          return event.data;
        },
      }),
      setError: (_, event) => {},
    },
    services: {
      loadToDos: async () => await getTodos(),
    },
  },
);
