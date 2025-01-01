import { ChangeEvent, FormEvent } from "react";
import { useSelector } from "@xstate/react";

import {
	TODOCREATE_EVENT_COMP_CHANGED,
	TODOCREATE_EVENT_TEXT_CHANGED,
	TODOCREATE_EVENT_BACK,
	TodoCreateService,
} from "@/machines/todoCreateMachine.ts";
import { Toggle } from "@components/Toggle/Toggle";
import { useTodoAppService } from "@/machines/TodoAppMachineContext";

import cm from './styles.module.css'

export function ToDoCreate() {
	const service = useTodoAppService();

	const childService = useSelector(service, (state) => state.children.createTodo as TodoCreateService);
	const childContext = useSelector(childService, (state) => state.context);

	const handleCheckboxChange = (checked: boolean) => {
		childService.send({ type: TODOCREATE_EVENT_COMP_CHANGED, data: checked });
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		childService.send({ type: TODOCREATE_EVENT_TEXT_CHANGED, data: event.target.value });
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// send('ADD_TODO');
	}

	const handleBack = () => {
		childService.send(TODOCREATE_EVENT_BACK);
	}

	return (
		<div>
			<div>
				<button onClick={handleBack}>⬅</button>
			</div>
			<form action="#" onSubmit={handleSubmit} className={cm.self}>
				<Toggle checked={childContext.checked} onChange={handleCheckboxChange}  />
				<label>
					<input
					  type="text"
					  onChange={handleInputChange}
					  className={cm.input}
					  value={childContext.text}
					/>
				</label>
				<button type="submit">Add</button>
			</form>
		</div>
	);
}