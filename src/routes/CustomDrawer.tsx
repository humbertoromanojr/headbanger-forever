import React from "react";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export function CustomDrawerContent(props, navigation) {
	function closeDrawer() {
		props.navigation.closeDrawer();
	}

	return (
		<DrawerContentScrollView style={styles.container} {...props}>
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={closeDrawer}>
					<Icon
						name='close'
						size={30}
						color={"#ccc"}
						style={{ marginRight: -20 }}
					/>
				</TouchableOpacity>
			</View>
			<View>
				<DrawerItemList {...props} />
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 0,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingRight: 28,
		paddingLeft: 5,
		marginTop: -10,
	},
});
