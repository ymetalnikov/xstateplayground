import { createMachine, assign, InterpreterFrom } from "xstate";

export const TODOCREATE_EVENT_COMP_CHANGED = "todocreate_event_comp_changed";
export const TODOCREATE_EVENT_TEXT_CHANGED = "todocreate_event_text_changed";
export const TODOCREATE_EVENT_FORM_SUBMITED = "todocreate.event.form.SUBMITED";
export const TODOCREATE_EVENT_BACK = "todocreate.event.back";

export const TODOCREATE_STATE_INITIAL = "todocreatestateinit";
export const TODOCREATE_STATE_FINAL = "todocreatestatefinal";

export type Events =
  | {
      type: typeof TODOCREATE_EVENT_TEXT_CHANGED;
  data: string;
    }
  | {
      type: typeof TODOCREATE_EVENT_COMP_CHANGED;
      data: boolean;
    }
  | {
      type: typeof TODOCREATE_EVENT_FORM_SUBMITED;
    }
  | {
      type: typeof TODOCREATE_EVENT_BACK;
    };

export const todoCreateMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMBOYCGAXMAVA9hPgHRaH5qY6xbZgCWAdvVgMRlGV3FgBuYjLMWT4AtgAdhACwyMYEANoAGALqJQ4-LBb18jdSAAeiAIwmAbMQDsAFisAOR0oDMdqwFYrzgDQgAnogAtACc9sQmNu4ATFYW9jYxVl4Avsm+XDgERKTkGXC0OEws7Lno3HwCQjiGQsgycpDKakggmtpYuvotxgg25mEmriaxNvbO9krm7r4BCIFRUcRRSlH25krB7iZRwV7B5qnpZZnkOZzH+XRFbBwUFzz8gsQAZvioosQAygCqAEIAsgBJXAAUQAIk0DG0dHoDD1nM5LOZgs5gpt7Ek0bYZogYpYrEobDYzBslBEts5UmkQIxCHADHksvgoVoYV1QD1AuZnMR3MEFsEieYoiZ7Ci1ji5qL3MQ+vZls5VmMouZtocQIzTrc8jQrswsCz2p04UETDK+QKhSKxeNzJKTPtiC5zASTGT3O4VlZgurNdltRddThnkwMAAbQ1sk0IcxE2Vo-aTEUO-mSmIy4XubmeDbOD0xKnJIA */
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
          [TODOCREATE_EVENT_BACK]: {
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
        text: (_, event) => event.data,
      }),
      assignFormCheckToContext: assign({
        checked: (_, event) => event.data,
      }),
    },
  },
);

export type TodoCreateService = InterpreterFrom<typeof todoCreateMachine>;