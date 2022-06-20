import { IFetchService } from "./interfaces/IFetchService";

export class FetchService implements IFetchService {
	public fetch(
		input: string | Request,
		init: RequestInit,
		timeout = 60000
	): Promise<Response> {
		const controller = new AbortController();
		setTimeout(() => controller.abort(), timeout);

		init.signal = controller.signal;

		return fetch(input, init);
	}
}
