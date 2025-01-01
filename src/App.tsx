import { useSelector } from "@xstate/react";
import { match } from 'ts-pattern';
import {
  TODO_STATE_LOADED,
  TODO_STATE_CREATE,
  TODO_STATE_LOADING,
} from "./machines/todoAppMachine";

import { Wrapper } from "./components/Wrapper";
import { ToDoLoaded } from "./features/ToDoList";
import { ToDoCreate } from "./features/ToDoCreate";
import { useTodoAppService } from "@/machines/TodoAppMachineContext";

import "./App.css";

function App() {
  const service = useTodoAppService();
  const state = useSelector(service, (state) => state.value);

  return (
    <Wrapper>
      {match(state)
        .with(TODO_STATE_LOADING, () => <p>Loading...</p>)
        .with(TODO_STATE_LOADED, () => <ToDoLoaded />)
        .with(TODO_STATE_CREATE, () => <ToDoCreate />)
        .otherwise(() => null)}
    </Wrapper>
  );
}

export default App;
