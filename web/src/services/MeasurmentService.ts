import Service from "@/services/Service";

// DI
import { FetchService } from "@/services/FetchService";
import { IFetchService } from "@/services/interfaces/IFetchService";
import { IAuthTokenService } from "@/services/interfaces/IAuthTokenService";

import config from "@/config";
import { useAuthStore } from "@/stores/authStore";
import { MeasurementeModel } from "../models/MeasurementModel";
import { getUrl } from "../helpers/common-ts/src/common/url";

export class MeasurementService extends Service {
	public constructor(
		public authTokenService: IAuthTokenService | null = useAuthStore(),
		public fetchService: IFetchService = new FetchService(),
		public configParams: {
			requestCache: RequestCache;
			patient_api: {
				url: string;
				routes: {
					measurement: {
						get: string;
					};
				};
			};
		} = config
	) {
		super();
	}

	public async get(patient_id: number): Promise<MeasurementeModel[]> {
		const response = await this.fetchService.fetch(
			getUrl(
				this.configParams.patient_api.url,
				this.configParams.patient_api.routes.measurement.get,
				{
					patient_id: patient_id.toString(),
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

			return dtos.measurements_series.map(
				(item: MeasurementeModel) => new MeasurementeModel(item)
			);
		}

		if (response.status === 404) {
			return [];
		}

		throw new Error("Get occurrence info error " + response.status);
	}
}
