import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";

import { Router } from "./src/routes/Router";

function App(): React.JSX.Element {
	return (
		<GestureHandlerRootView>
			<StatusBar barStyle={"dark-content"} translucent />
			<Router />
		</GestureHandlerRootView>
	);
}

export default App;
