import { validateSession } from "../../../index.js";

document.addEventListener("DOMContentLoaded", async () => {
  await validateSession();
});
