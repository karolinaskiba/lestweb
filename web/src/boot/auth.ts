import { boot } from "quasar/wrappers";
import { loginFromLocalstorage, logout } from "@/helpers/auth";

export default boot(async ({ app }) => {
	try {
		await loginFromLocalstorage();
	} catch (e) {
		logout();
	}
});
