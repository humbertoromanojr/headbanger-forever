import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomButton } from "../../components/CustomButton";
import { useAuth } from "../../contexts/Auth";

export function SettingScreen() {
	const navigation = useNavigation();
	const { signOut } = useAuth();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Setting Screen</Text>
			<CustomButton title='Sair do App' onPress={signOut} />
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
