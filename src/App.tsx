import { useMachine } from "@xstate/react";
import { TODO_EVENT_CREATE, TODO_STATE_CREATE, TODO_STATE_LOADING, todosMachine } from "./machines/todoAppMachine";
import { ToDoItem, ToDoList } from "./features/ToDoList";
import { Wrapper } from "./features/Wrapper";

import "./App.css";
import { AddTodo } from "./features/AddTodo";

function App() {
  const [state, send] = useMachine(todosMachine);

  const handleClick = () => {
    send(TODO_EVENT_CREATE);
  };

  if (state.value === TODO_STATE_LOADING) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (state.value === TODO_STATE_CREATE) {
    return <Wrapper><AddTodo /></Wrapper>
  }

  return (
    <Wrapper>
      <div>
        <button onClick={handleClick}>Add➕</button>
      </div>
      <ToDoList>
        {state.context.todos?.map((item) => (
          <ToDoItem key={item.id} item={item} />
        ))}
      </ToDoList>
    </Wrapper>
  );
}

export default App;
