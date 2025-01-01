import cm from './styles.module.css';

interface ToDoItemProps {
	item: {
		id: string
		text: string
		completed: boolean
	}
}


export function ToDoItem({ item }: ToDoItemProps) {
	return (
		<li className={cm.todoItem}>
			<input className={cm.toggle} type="checkbox" checked={item.completed} />
			<span className={cm.text}>{item.text}</span>
			<div>
				<button>📝</button>
				<button>❌</button>
			</div>
		</li>
	);
}
