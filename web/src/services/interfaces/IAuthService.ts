import { AuthModel } from "@/models/AuthModel";
export interface IAuthService {
	login(login: string, password: string): Promise<AuthModel | null>;
}
