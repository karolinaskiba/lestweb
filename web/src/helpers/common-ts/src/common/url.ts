import Map from "../interfaces/MapInterface";
import { trimChar } from "./string";

export function bindParamsToPath(url = "", params: Map<string> = {}): string {
	Object.keys(params).forEach((key: string) => {
		if (params[key] != null) {
			url = url.replace("{" + key + "}", params[key]);
		} else {
			url = url.replace("{" + key + "}", "");
		}
	});

	return url;
}

/**
 * @param {string} url
 * @param {string} path
 * @param {object} pathParams
 * @return {string}
 */
export function getUrl(
	url: string,
	path: string,
	pathParams: Map<string> = {},
	queryParams: Map<string> = {}
): string {
	let result: string =
		trimChar(url, "/") +
		"/" +
		bindParamsToPath(trimChar(path, "/"), pathParams);

	const keys = Object.keys(queryParams);
	if (keys.length > 0) {
		result += "?";
		keys.forEach((key: string, index: number) => {
			if (index > 0) {
				result += "&";
			}
			result += key + "=" + queryParams[key];
		});
	}

	return result;
}
