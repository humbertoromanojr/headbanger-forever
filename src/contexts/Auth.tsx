import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

import { authService } from "../services/authService";

type AuthData = {
	token: string | undefined;
	email: string | undefined;
	name: string | undefined;
};

type AuthContextData = {
	authData?: AuthData;
	signIn: (email: string, password: string) => Promise<AuthData>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }: any) => {
	const [authData, setAuthData] = useState<AuthData>();

	async function signIn(email: string, password: string): Promise<AuthData> {
		try {
			const auth = await authService.signIn(email, password);

			setAuthData(auth);

			return auth;
		} catch (error) {
			Alert.alert(error.message, "Please try again, unexpected error!");
		}
	}

	async function signOut(): Promise<void> {
		console.log("----- signOut -----");
		setAuthData(undefined);

		return;
	}

	return (
		<AuthContext.Provider value={{ authData, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);

	return context;
}
