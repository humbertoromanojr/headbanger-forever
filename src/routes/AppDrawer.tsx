import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreen } from "../screens/Home";
import { SettingScreen } from "../screens/Setting";
import { AboutScreen } from "../screens/About";
import { MyFavoriteBandsScreen } from "../screens/MyFavoriteBands/index";
import { MyFavoriteGenresScreen } from "../screens/MyFavoriteGenres/index";
import { MyFavoriteAlbumsScreen } from "../screens/MyFavoriteAlbums/index";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
	return (
		<Drawer.Navigator
			initialRouteName='Home'
			screenOptions={{
				drawerStyle: {
					backgroundColor: "#111113",
					width: 240,
				},
				drawerInactiveTintColor: "#fff",
				drawerActiveTintColor: "#f60606",
				headerStyle: {
					backgroundColor: "#000",
					height: 60,
					borderBottomWidth: 1,
					borderColor: "#555555",
					alignItems: "center",
					justifyContent: "center",
				},
				headerTintColor: "#fff",
			}}>
			<Drawer.Screen name='Home' component={HomeScreen} />
			<Drawer.Screen
				name='My Favorite Bands'
				component={MyFavoriteBandsScreen}
			/>
			<Drawer.Screen
				name='My Favorite Genres'
				component={MyFavoriteGenresScreen}
			/>
			<Drawer.Screen
				name='My Favorite Albums'
				component={MyFavoriteAlbumsScreen}
			/>
			<Drawer.Screen name='Setting' component={SettingScreen} />
			<Drawer.Screen name='About' component={AboutScreen} />
		</Drawer.Navigator>
	);
}
