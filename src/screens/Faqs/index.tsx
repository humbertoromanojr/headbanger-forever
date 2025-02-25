import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;

export function FaqsScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerInfo}>
				<Text style={styles.title}>Headbanger Forever</Text>
				<Text style={styles.text}>
					I'm developing this app to promote metal bands of all genres
					on the{" "}
					<Text style={styles.metalArquives}>metal-arquives.com</Text>
					&nbsp;website, but I'm using an unofficial API that has been
					released and approved by the site.
				</Text>
				<Icon name='settings' size={30} color='#900' />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	containerInfo: {
		width: windowWidth,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	title: {
		width: windowWidth,
		color: "#fff",
		fontSize: 32,
		padding: 10,
		marginTop: 10,
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "#f90000",
	},
	text: {
		width: "100%",
		color: "#fff",
		fontSize: 22,
		padding: 10,
		textAlign: "justify",
	},
	metalArquives: {
		color: "#f90000",
		fontWeight: "bold",
	},
});
