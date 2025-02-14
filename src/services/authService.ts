import { AuthData } from "../contexts/Auth";

async function signIn(email: string, password: string): Promise<AuthData> {
	return new Promise<AuthData>((resolve, reject) => {
		setTimeout(() => {
			if (password === "123456") {
				resolve({
					token: "fake-token",
					email,
					name: "Humberto Junior",
				});
			} else {
				reject(new Error("Invalid credentials"));
			}
		}, 500);
	});
}

export const authService = { signIn };
