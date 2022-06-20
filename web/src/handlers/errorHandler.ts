import config from "@/config";
import { logout } from "@/helpers/auth";
import * as loadingIndicator from "@/helpers/loadingIndicator";
import * as toast from "@/helpers/toast";
import { NavigationGuardNext } from "vue-router";

/**
 * @param {string | Error} error
 * @param {Function} callback
 */
export function errorHandler(
	error: Error | string,
	params: {
		filename?: string;
		code?: string;
		next?: NavigationGuardNext;
	} = { filename: "", code: "" }
) {
	error = typeof error === "undefined" ? "Error" : error;
	loadingIndicator?.hide();

	if (config.development) {
		console.error(error);
	}

	/**
	 * @type {string}
	 */
	let msg;

	if (typeof error != "string") {
		msg = error.message;
	} else {
		msg = error;
	}

	const authError = msg.includes("401");

	if (params.filename) {
		msg += ", file: " + params.filename;
	}

	if (params.code != "") {
		msg += ", code: " + params.code;
	}

	toast?.error(config.development ? msg : "Błąd serwera");

	if (!config.development) {
		if (authError) {
			logout();
		}

		if (params.next) {
			params.next({ name: "home" });
		} else {
			// session.router?.push({ name: "home" });
		}

		return;
	}

	if (params.next) {
		params.next(false);
	}
}
