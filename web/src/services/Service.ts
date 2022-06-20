import { IAuthTokenService } from "./interfaces/IAuthTokenService";
import { IFetchService } from "./interfaces/IFetchService";
import { FetchService } from "./FetchService";
import { ResultType } from "./interfaces/ResultType";
export default abstract class Service {
	public authTokenService: IAuthTokenService | null = null;
	public fetchService: IFetchService = new FetchService();

	/**
	 * @return {Headers}
	 */
	getHeaders(): Headers {
		const headers = new Headers();

		if (this.authTokenService !== null) {
			const token = this.authTokenService.getAuthToken();
			if (token !== "") {
				headers.append("Authorization", "Bearer " + token);
			}
		}

		return headers;
	}

	async request(
		method: string,
		url: string,
		body: any,
		errorMessage: string,
		cache: RequestCache = "no-store"
	): Promise<ResultType> {
		const headers = this.getHeaders();
		headers.append("Content-Type", "application/json");

		const response = await this.fetchService.fetch(url, {
			cache,
			body: body ? JSON.stringify(body) : null,
			headers,
			method,
		});

		if (response.status === 200) {
			return {
				message: "",
			};
		}

		if (response.status === 400) {
			const result = await response.json();
			return {
				message: result.message,
			};
		}

		throw new Error(errorMessage + ": " + response.status);
	}

	async requestForm(
		method: string,
		url: string,
		form: FormData,
		errorMessage: string,
		cache: RequestCache = "no-store"
	): Promise<ResultType> {
		const headers = this.getHeaders();

		const response = await this.fetchService.fetch(url, {
			cache,
			body: form,
			headers,
			method,
		});

		if (response.status === 200) {
			return {
				message: "",
			};
		}

		if (response.status === 400) {
			const result = await response.json();
			return {
				message: result.message,
			};
		}

		throw new Error(errorMessage + ": " + response.status);
	}
}
