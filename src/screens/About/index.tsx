import React from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	ScrollView,
	Image,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

export function AboutScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.containerInfo}>
					<Text style={styles.title}>Headbanger Forever</Text>
					<Text style={styles.text}>
						I'm developing this app to promote metal bands of all
						genres on the{" "}
						<Text style={styles.metalArquives}>
							metal-arquives.com
						</Text>
						&nbsp;website, but I'm using an unofficial API that has
						been released and approved by the site. The Api I'm
						using is here:{" "}
						<Text style={styles.metalArquives}>metal-api.dev</Text>,
						it's in its v1 version, but according to the information
						on the site, they're already working on v2, visit and
						read more information. {"\n\n"}But unfortunately in this
						v1 the API, this group of API-Calls can be used to
						search for bands or albums (the search is only limited
						to the first 200 results)
					</Text>
					<View
						style={{
							justifyContent: "center",
							width: windowWidth,
							alignItems: "center",
						}}>
						<Image
							resizeMode='contain'
							style={styles.emailImage}
							source={require("../../assets/images/hand-headbanguer.png")}
						/>
					</View>
				</View>
			</ScrollView>
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
	emailImage: {
		width: 120,
		height: 120,
		textAlign: "center",
		resizeMode: "cover",
		marginTop: 10,
	},
});
