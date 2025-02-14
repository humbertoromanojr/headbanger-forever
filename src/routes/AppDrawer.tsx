import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from "../screens/Home";
import { SettingScreen } from "../screens/Setting";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
	return (
		<Drawer.Navigator initialRouteName='Home'>
			<Drawer.Screen name='Home' component={HomeScreen} />
			<Drawer.Screen name='Setting' component={SettingScreen} />
		</Drawer.Navigator>
	);
}
