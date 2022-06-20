import Service from "@/services/Service";

// DI
import { FetchService } from "@/services/FetchService";
import { IFetchService } from "@/services/interfaces/IFetchService";
import { IAuthTokenService } from "@/services/interfaces/IAuthTokenService";

import config from "@/config";
import { useAuthStore } from "@/stores/authStore";
import { UserModel } from "@/models/UserModel";
import { getUrl } from "../helpers/common-ts/src/common/url";

import { ResultType } from "@/services/interfaces/ResultType";

export class UserService extends Service {
	public constructor(
		public authTokenService: IAuthTokenService | null = useAuthStore(),
		public fetchService: IFetchService = new FetchService(),
		public configParams: {
			requestCache: RequestCache;
			nx_api: {
				url: string;
				routes: {
					user: {
						get: string;
						//put: string;
						//delete: string;
						//passwordChange: string;
					};
				};
			};
		} = config
	) {
		super();
	}

	public async getUser(): Promise<UserModel> {
		const response = await this.fetchService.fetch(
			getUrl(
				this.configParams.nx_api.url,
				this.configParams.nx_api.routes.user.get
			),
			{
				cache: this.configParams.requestCache,
				headers: this.getHeaders(),
				method: "get",
			}
		);

		if (response.status === 200) {
			const dto = await response.json();
			return new UserModel(dto);
		}

		throw new Error("Get user info error " + response.status);
	}

	// public async updateProfile(data: {
	// 	name: string;
	// 	email: string;
	// }): Promise<ResultType> {
	// 	return await this.request(
	// 		"put",
	// 		getUrl(this.configParams.api.url, this.configParams.api.routes.user.put),
	// 		data,
	// 		"Update user error"
	// 	);
	// }

	// public async changePassword(password: string): Promise<ResultType> {
	// 	return await this.request(
	// 		"put",
	// 		getUrl(
	// 			this.configParams.api.url,
	// 			this.configParams.api.routes.user.passwordChange
	// 		),
	// 		{ password },
	// 		"Password change error"
	// 	);
	// }

	// public async deleteAccount(): Promise<ResultType> {
	// 	return await this.request(
	// 		"delete",
	// 		getUrl(
	// 			this.configParams.api.url,
	// 			this.configParams.api.routes.user.delete
	// 		),
	// 		null,
	// 		"Account delete error"
	// 	);
	// }
}
