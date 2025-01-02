import cm from "./styles.module.css";

export function Toggle(props: {
	checked: boolean;
	onChange: (checked: boolean) => void;
}) {

	return (
		<label className={cm.switch}>
			<input
				checked={props.checked}
				onChange={(event) => {
					props.onChange(event.target.checked);
				}}
				type="checkbox"
			/>
			<span className={cm.slider} />
		</label>
	);
}
