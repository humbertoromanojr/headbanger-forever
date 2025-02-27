import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";

import { Router } from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/Auth";
import { ThemeProvider } from "@react-navigation/native";

function App(): React.JSX.Element {
	return (
		<GestureHandlerRootView>
			<AuthProvider>
				<ThemeProvider>
					<StatusBar barStyle={"dark-content"} translucent />
					<Router />
				</ThemeProvider>
			</AuthProvider>
		</GestureHandlerRootView>
	);
}

export default App;
