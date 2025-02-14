import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomButton } from "../../components/CustomButton";

export function HomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Home Screen</Text>
			<CustomButton
				title='Settings'
				onPress={() => navigation.navigate("Setting")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center",
	},
	title: { color: "#fff", fontSize: 22 },
});
