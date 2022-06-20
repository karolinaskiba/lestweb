export interface IAuthTokenService {
	getAuthToken(): string;
	setAuthToken(token: string): void;
}
