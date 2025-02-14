import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./AuthStack";
import { AppDrawer } from "./AppDrawer";
import { useAuth } from "../contexts/Auth";

export function Router() {
	const { authData } = useAuth();

	return (
		<NavigationContainer>
			{authData ? <AppDrawer /> : <AuthStack />}
		</NavigationContainer>
	);
}
