import { useSelector } from "@xstate/react";

import { TODO_EVENT_CREATE } from "@/machines/todoAppMachine.ts";
import { useTodoAppService } from "@/machines/TodoAppMachineContext";
import { ToDoList } from "./ToDoList";
import { ToDoItem } from "./ToDoItem";

export function ToDoLoaded() {
  const service = useTodoAppService();
  const context = useSelector(service, (state) => state.context);
  const completed = useSelector(service, (state) => state.context.todos.filter((todo) => todo.completed).length);
  const uncompleted = useSelector(service, (state) => state.context.todos.filter((todo) => !todo.completed).length);

  const handleClick = () => {
    service.send(TODO_EVENT_CREATE);
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>Add todo ➕</button>
      </div>
      <ToDoList>
        {context.todos?.map((item) => <ToDoItem key={item.id} item={item} />)}
      </ToDoList>
      <div>
        completed: {completed} | uncompleted: {uncompleted}
      </div>
    </>
  );
}
