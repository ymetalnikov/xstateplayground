import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"), // Алиас для папки src
			"@components": path.resolve(__dirname, "./src/components"), // Пример для компонетов
			"@utils": path.resolve(__dirname, "./src/utils"), // Пример для утилит
		},
	},
});
