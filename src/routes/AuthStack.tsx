import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen } from "../screens/SignIn";

const Stack = createNativeStackNavigator();

export function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='SignIn' component={SignInScreen} />
		</Stack.Navigator>
	);
}
