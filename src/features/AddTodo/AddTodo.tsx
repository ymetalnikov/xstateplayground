import { useMachine } from "@xstate/react";
import { TODOCREATE_EVENT_COMP_CHANGED, TODOCREATE_EVENT_TEXT_CHANGED, todoCreateMachine } from "../../machines/todoCreateMachine";
import { Toggle } from "../../Toggle/Toggle";

import cm from './styles.module.css'

export function AddTodo() {
	const [childState, send] = useMachine(todoCreateMachine);

	const handleCheckboxChange = (checked: boolean) => {
		send(TODOCREATE_EVENT_COMP_CHANGED, { data: checked });
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		send(TODOCREATE_EVENT_TEXT_CHANGED, { data: event.target.value });
	}

	return (
		<div>
			<form action="#" onSubmit={(e) => {
				e.preventDefault();
				send('ADD_TODO');
			}} className={cm.self}>
				<Toggle onChange={handleCheckboxChange} checked={childState.context.checked} />
				<label>
					<input type="text" onChange={handleInputChange} className={cm.input} value={childState.context.text} />
				</label>
				<button type="submit">Add</button>
			</form>
		</div>
	);
}

