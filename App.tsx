import React from "react";

import { Router } from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/Auth";

function App(): React.JSX.Element {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	);
}

export default App;
