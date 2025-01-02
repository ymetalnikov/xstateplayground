
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.getTodos": { type: "done.invoke.getTodos"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.getTodos": { type: "error.platform.getTodos"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loadToDos": "done.invoke.getTodos";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "setError": "error.platform.getTodos";
"setTodos": "done.invoke.getTodos";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loadToDos": "xstate.init";
        };
        matchesStates: "CREATE" | "LOADED" | "LOADING";
        tags: never;
      }
  