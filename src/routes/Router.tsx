import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppDrawer } from "./AppDrawer";

export function Router() {
	return (
		<NavigationContainer>
			<AppDrawer />
		</NavigationContainer>
	);
}
