import Service from "@/services/Service";

// DI
import { FetchService } from "@/services/FetchService";
import { IFetchService } from "@/services/interfaces/IFetchService";
import { IAuthTokenService } from "@/services/interfaces/IAuthTokenService";

import config from "@/config";
import { useAuthStore } from "@/stores/authStore";
import { OccurenceModel } from "@/models/OccurenceModel";
import { getUrl } from "../helpers/common-ts/src/common/url";
import { ResultType } from "./interfaces/ResultType";

export class OccurenceService extends Service {
	public constructor(
		public authTokenService: IAuthTokenService | null = useAuthStore(),
		public fetchService: IFetchService = new FetchService(),
		public configParams: {
			requestCache: RequestCache;
			patient_api: {
				url: string;
				routes: {
					occurrence: {
						post: string;
						get: string;
					};
				};
			};
		} = config
	) {
		super();
	}

	public async get(
		userId: number,
		inserttime: number,
		occurrence: number
	): Promise<OccurenceModel[]> {
		const response = await this.fetchService.fetch(
			getUrl(
				this.configParams.patient_api.url,
				this.configParams.patient_api.routes.occurrence.get,
				{
					userId: userId.toString(),
					inserttime: inserttime.toString(),
					occurrence: occurrence.toString(),
				}
			),
			{
				cache: this.configParams.requestCache,
				headers: this.getHeaders(),
				method: "get",
			}
		);

		if (response.status === 200) {
			const dtos = await response.json();

			return dtos.pain_occurrence.map(
				(item: OccurenceModel) => new OccurenceModel(item)
			);
		}

		if (response.status === 404) {
			return [];
		}

		throw new Error("Get occurrence info error " + response.status);
	}

	public async add(data: OccurenceModel): Promise<ResultType> {
		return await this.request(
			"post",
			getUrl(
				this.configParams.patient_api.url,
				this.configParams.patient_api.routes.occurrence.post
			),
			data,
			"Add occurrence error"
		);
	}
}
