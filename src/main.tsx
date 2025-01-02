import React from "react";
import ReactDOM from "react-dom/client";
import { TodoAppProvider } from "@/machines/TodoAppMachineContext";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<TodoAppProvider>
			<App />
		</TodoAppProvider>
	</React.StrictMode>,
);
