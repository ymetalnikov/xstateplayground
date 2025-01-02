import { createContext, ReactNode, useContext } from "react";
import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import { todosMachine } from "./todoAppMachine";

type TodoAppService = InterpreterFrom<typeof todosMachine>;

const TodoAppContext = createContext<TodoAppService | null>(null);

export const TodoAppProvider = ({ children }: { children: ReactNode }) => {
	const service = useInterpret(todosMachine);

	return (
		<TodoAppContext.Provider value={service}>
			{children}
		</TodoAppContext.Provider>
	);
};

export const useTodoAppService = () => {
	const context = useContext(TodoAppContext);
	if (!context) {
		throw new Error("useTodosService must be used within a TodoAppProvider");
	}
	return context;
};
