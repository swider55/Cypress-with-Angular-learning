import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: 'ui',
    baseUrl: 'http://localhost:4200',
  },
});
