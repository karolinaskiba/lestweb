import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";
import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";
import { IAuthService } from "@/services/interfaces/IAuthService";
import { UserModel } from "@/models/UserModel";

const localStorageAuthTokenKey = "authToken";

async function getUser() {
	const state = useAppStore();
	const service = new UserService();
	state.user = await service.getUser();
}

export async function login(
	login: string,
	password: string,
	authService: IAuthService = new AuthService()
): Promise<boolean> {
	const auth = await authService.login(login, password);

	if (!auth) {
		logout();
		return false;
	}

	setAuthToken(auth.token);
	await getUser();

	return true;
}

export function logout() {
	const state = useAppStore();
	const auth = useAuthStore();

	localStorage.removeItem(localStorageAuthTokenKey);
	state.isAuthenticated = false;
	state.isAdmin = false;
	state.user = new UserModel();
	auth.setAuthToken("");
}

export function setAuthToken(token: string) {
	const state = useAppStore();
	const auth = useAuthStore();

	auth.setAuthToken(token);
	localStorage.setItem(localStorageAuthTokenKey, token);
	state.isAuthenticated = true;
}

export async function loginFromLocalstorage() {
	if (!localStorage.getItem(localStorageAuthTokenKey)) {
		return;
	}

	setAuthToken(<string>localStorage.getItem(localStorageAuthTokenKey));
	await getUser();
}
