import { ReactNode } from "react";

import cm from "./styles.module.css";

interface ToDoListProps {
	children: ReactNode;
}

export function ToDoList({ children }: ToDoListProps) {
	return <div className={cm.wrapperList}>
    <ul className={cm.todoList}>{children}</ul>
  </div>;
}
