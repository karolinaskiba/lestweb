/**
 * Provides some functions
 *
 * @module Netrix\common\date
 */

import { trimChar } from "./string";

export function formatDateYYYYMMDD(
	date = "",
	params: { time: boolean } = { time: true }
): string {
	const d = date === "" ? new Date() : new Date(date);

	let day = ("0" + d.getDate()).slice(-2);

	if (params?.time === true) {
		day =
			day +
			" " +
			("0" + d.getHours()).slice(-2) +
			":" +
			("0" + d.getMinutes()).slice(-2);
		// + ':' + ('0' + d.getSeconds()).slice(-2);
	}

	return [d.getFullYear(), ("0" + (d.getMonth() + 1)).slice(-2), day].join("-");
}

export function secondsToDaysHoursMinsSecs(seconds: number): string {
	// day, h, m and s
	const days = Math.floor(seconds / (24 * 60 * 60));
	seconds -= days * (24 * 60 * 60);
	const hours = Math.floor(seconds / (60 * 60));
	seconds -= hours * (60 * 60);
	const minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	return (
		(days > 0 ? days + " d, " : "") +
		(hours < 10 ? "0" : "") +
		hours +
		":" +
		(minutes < 10 ? "0" : "") +
		minutes +
		":" +
		(seconds < 10 ? "0" : "") +
		seconds
	);
}

export function string2UTC(date: string): Date {
	return new Date(trimChar(date, "Z") + "Z");
}
