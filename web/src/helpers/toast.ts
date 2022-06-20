import { Notify } from "quasar";

export async function open(message: string) {
	Notify.create({
		message,
		color: "primary",
		actions: [{ icon: "close", color: "white" }],
	});
}

export async function error(message: string) {
	Notify.create({
		message,
		color: "red",
		actions: [{ icon: "close", color: "white" }],
	});
}
