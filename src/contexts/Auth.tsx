import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
	isLoading: boolean;
};

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }: any) => {
	const [authData, setAuthData] = useState<AuthData>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadFromStorage();
	}, []);

	async function loadFromStorage() {
		const auth = await AsyncStorage.getItem("@AuthData");

		if (auth) {
			setAuthData(JSON.parse(auth) as AuthData);
		}

		setIsLoading(false);
	}

	async function signIn(email: string, password: string): Promise<AuthData> {
		try {
			const auth = await authService.signIn(email, password);

			setAuthData(auth);

			AsyncStorage.setItem("@AuthData", JSON.stringify(auth));
		} catch (error) {
			Alert.alert(error.message, "Please try again, unexpected error!");
		}
	}

	async function signOut(): Promise<void> {
		console.log("----- signOut -----");
		setAuthData(undefined);

		AsyncStorage.removeItem("@AuthData");

		return;
	}

	return (
		<AuthContext.Provider value={{ authData, isLoading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);

	return context;
}
