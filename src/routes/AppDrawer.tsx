import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

import { HomeScreen } from "../screens/Home";
import { SettingScreen } from "../screens/Setting";
import { AboutScreen } from "../screens/About";
import { MyFavoriteBandsScreen } from "../screens/MyFavoriteBands/index";
import { MyFavoriteGenresScreen } from "../screens/MyFavoriteGenres/index";
import { MyFavoriteAlbumsScreen } from "../screens/MyFavoriteAlbums/index";
import { MyFavoriteBandDetailsScreen } from "../screens/MyFavoriteBands/MyFavoriteBandDetails";
import { ContactUsScreen } from "../screens/ContactUs";
import { FaqsScreen } from "../screens/Faqs";

import { CustomDrawerContent } from "./CustomDrawer";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			initialRouteName='Home'
			screenOptions={{
				drawerStyle: {
					backgroundColor: "#111113",
					width: 240,
				},
				drawerInactiveTintColor: "#fff",
				drawerActiveTintColor: "#f60606",
				headerStyle: {
					backgroundColor: "#111",
					borderBottomWidth: 0.5,
					borderColor: "#161414",
				},
				drawerLabelStyle: {
					fontFamily: "Roboto",
				},
				headerTintColor: "#fff",
			}}>
			<Drawer.Screen
				name='Home'
				component={HomeScreen}
				options={{
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='home'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name='My Favorite Bands'
				component={MyFavoriteBandsScreen}
				options={{
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='album'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name='My Favorite Band Details'
				options={{
					drawerItemStyle: { display: "none" },
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='album'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
				component={MyFavoriteBandDetailsScreen}
			/>
			<Drawer.Screen
				name='My Favorite Genres'
				component={MyFavoriteGenresScreen}
				options={{
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='album'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name='My Favorite Albums'
				component={MyFavoriteAlbumsScreen}
				options={{
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='album'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name='Contact Us'
				component={ContactUsScreen}
				options={{
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='email'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name='Setting'
				component={SettingScreen}
				options={{
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='settings'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name='FAQs'
				component={FaqsScreen}
				options={{
					headerTitle: "FAQs",
					headerTitleStyle: {},
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='help'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name='About'
				component={AboutScreen}
				options={{
					headerTitleAlign: "left",
					drawerIcon: ({ focused, size }) => (
						<Icon
							name='info'
							size={size}
							color={focused ? "#900" : "#ccc"}
							style={{ marginRight: -20 }}
						/>
					),
				}}
			/>
		</Drawer.Navigator>
	);
}
