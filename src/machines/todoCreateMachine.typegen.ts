
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.submitForm": { type: "done.invoke.submitForm"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.submitForm": { type: "error.platform.submitForm"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "submitFormService": "done.invoke.submitForm";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assignFormCheckToContext": "todocreate.event.comp_changed";
"assignFormInputToContext": "todocreate.event.text_changed";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "submitFormService": "todocreate.event.form_submited";
        };
        matchesStates: "todocreatestatefinal" | "todocreatestateinit" | "todocreatestatesubmitting";
        tags: never;
      }
  