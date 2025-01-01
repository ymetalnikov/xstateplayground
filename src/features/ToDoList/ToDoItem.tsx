import { Toggle } from '@/components/Toggle/Toggle';
import cm from './styles.module.css';

interface ToDoItemProps {
	item: {
		id: string
		text: string
		completed: boolean
	}
}


export function ToDoItem({ item }: ToDoItemProps) {

	const handleChange = () => {}

	return (
		<li className={cm.todoItem}>
			<Toggle checked={item.completed} onChange={handleChange} />
			<span className={cm.text}>{item.text}</span>
			<div>
				<button>📝</button>
				<button>❌</button>
			</div>
		</li>
	);
}
