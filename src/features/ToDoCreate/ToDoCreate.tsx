import { ChangeEvent, FormEvent } from "react";
import { useSelector } from "@xstate/react";
import { match } from "ts-pattern";

import {
  TODOCREATE_EVENT_COMP_CHANGED,
  TODOCREATE_EVENT_TEXT_CHANGED,
  TODOCREATE_EVENT_FORM_SUBMITED,
  TODOCREATE_EVENT_BACK,

  TodoCreateService,

  TODOCREATE_STATE_INITIAL,
  TODOCREATE_STATE_SUBMITTING,
  TODOCREATE_STATE_FINAL,
} from "@/machines/todoCreateMachine.ts";
import { Toggle } from "@components/Toggle/Toggle";
import { useTodoAppService } from "@/machines/TodoAppMachineContext";

import cm from "./styles.module.css";

export function ToDoCreate() {
  const service = useTodoAppService();

  const childService = useSelector(
    service,
    (state) => state.children.createTodo as TodoCreateService,
  );
  const childValue = useSelector(childService, (state) => state.value);
  const childContext = useSelector(childService, (state) => state.context);

  const handleCheckboxChange = (checked: boolean) => {
    childService.send({
      type: TODOCREATE_EVENT_COMP_CHANGED,
      data: checked,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    childService.send({
      type: TODOCREATE_EVENT_TEXT_CHANGED,
      data: event.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    childService.send({ type: TODOCREATE_EVENT_FORM_SUBMITED });
  };

  const handleBack = () => {
    childService.send({ type: TODOCREATE_EVENT_BACK });
  };

  return (
    <div>
      <div>
        <button onClick={handleBack}>⬅</button>
      </div>
      <form action="#" onSubmit={handleSubmit} className={cm.self}>
        <Toggle
          checked={childContext.checked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="todo-create-text" className={cm.label}>
          Description:
        </label>
        <textarea
          id="todo-create-text"
          onChange={handleInputChange}
          className={cm.input}
          value={childContext.text}
        />
        {match(childValue)
          .with(TODOCREATE_STATE_INITIAL, () => <button type="submit">Add</button>)
          .with(TODOCREATE_STATE_SUBMITTING, () => <button disabled>Adding...</button>)
          .with(TODOCREATE_STATE_FINAL, () => <button disabled>Added</button>)
          .otherwise(() => null)
        }
      </form>
    </div>
  );
}
