import { createMachine, assign } from "xstate";

export const TODOCREATE_EVENT_COMP_CHANGED = "todocreate.event.comp.changed";
export const TODOCREATE_EVENT_TEXT_CHANGED = "todocreate.event.text.changed";
export const TODOCREATE_EVENT_FORM_SUBMITED = "todocreate.event.form.SUBMITED";

export const TODOCREATE_STATE_INITIAL = "todocreatestateinit";
export const TODOCREATE_STATE_FINAL = "todocreatestatefinal";

export type Events =
  | {
      type: typeof TODOCREATE_EVENT_TEXT_CHANGED;
      value: string;
    }
  | {
      type: typeof TODOCREATE_EVENT_COMP_CHANGED;
      value: boolean;
    }
  | {
      type: typeof TODOCREATE_EVENT_FORM_SUBMITED;
      value: boolean;
    };

export const todoCreateMachine = createMachine(
  {
    id: "createTodo",
    tsTypes: {} as import("./todoCreateMachine.typegen").Typegen0,
    schema: {
      events: {} as Events,
    },

    initial: TODOCREATE_STATE_INITIAL,

    context: {
      checked: false,
      text: "",
    },
    states: {
      [TODOCREATE_STATE_INITIAL]: {
        on: {
          [TODOCREATE_EVENT_COMP_CHANGED]: {
            actions: "assignFormCheckToContext",
          },
          [TODOCREATE_EVENT_TEXT_CHANGED]: {
            actions: "assignFormInputToContext",
          },
          [TODOCREATE_EVENT_FORM_SUBMITED]: {
            target: TODOCREATE_STATE_FINAL,
          },
        },
      },
      [TODOCREATE_STATE_FINAL]: {
        type: "final",
      },
    },
  },
  {
    actions: {
      assignFormInputToContext: assign({
        text: (_, event) => event.value,
      }),
      assignFormCheckToContext: assign({
        checked: (_, event) => event.value,
      }),
    },
  },
);
