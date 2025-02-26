import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";

import { Router } from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/Auth";

function App(): React.JSX.Element {
	return (
		<GestureHandlerRootView>
			<AuthProvider>
				<StatusBar barStyle={"dark-content"} translucent />
				<Router />
			</AuthProvider>
		</GestureHandlerRootView>
	);
}

export default App;
