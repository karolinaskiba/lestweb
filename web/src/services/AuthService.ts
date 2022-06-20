import Service from "@/services/Service";

// DI
import { FetchService } from "./FetchService";
import { IFetchService } from "./interfaces/IFetchService";

import { getUrl } from "../helpers/common-ts/src/common/url";
import config from "@/config";
import { IAuthService } from "./interfaces/IAuthService";
import { AuthModel } from "@/models/AuthModel";

export class AuthService extends Service implements IAuthService {
	public constructor(
		public fetchService: IFetchService = new FetchService(),
		public configParams: {
			requestCache: RequestCache;
			nx_api: {
				url: string;
				routes: {
					login: string;
				};
			};
		} = {
			requestCache: config.requestCache,
			nx_api: {
				url: config.nx_api.url,
				routes: config.nx_api.routes.account,
			},
		}
	) {
		super();
	}

	public async login(
		login: string,
		password: string
	): Promise<AuthModel | null> {
		const response = await this.fetchService.fetch(
			getUrl(
				this.configParams.nx_api.url,
				this.configParams.nx_api.routes.login
			),
			{
				body: JSON.stringify({ login, password }),
				cache: this.configParams.requestCache,
				headers: new Headers({
					"Content-Type": "application/json",
				}),
				method: "post",
			}
		);

		if (response.status === 200) {
			const data = await response.text();
			return new AuthModel(data);
		} else if (response.status === 401) {
			return null;
		}

		throw new Error("token error " + response.status);
	}
}
