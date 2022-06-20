/**
 * Provides some functions
 *
 * @module Netrix\common\string
 */

export function removeSpecialChars(str: string): string {
	return str
		.replace(/(?!\w|\s)./g, "")
		.replace(/\s+/g, "")
		.replace(/^(\s*)([\W\w]*)(\b\s*$)/g, "$2");
}

export function trimChar(text: string, charToRemove: string): string {
	if (text == "") {
		return text;
	}

	while (text.charAt(0) === charToRemove) {
		text = text.substring(1);
	}

	while (text.charAt(text.length - 1) === charToRemove) {
		text = text.substring(0, text.length - 1);
	}

	return text;
}

export function capitalize(s: string): string {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export function decapitalize(s: string): string {
	if (typeof s !== "string") return "";
	return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * @return {string}
 */
export function getRandomColor(): string {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
