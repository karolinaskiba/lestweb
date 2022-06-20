export interface IFetchService {
	fetch(
		input?: string | Request,
		init?: RequestInit,
		timeout?: number
	): Promise<Response>;
}
