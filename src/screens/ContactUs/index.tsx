import React from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	TouchableOpacity,
	Linking,
	Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;

export function ContactUsScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerInfo}>
				<Text style={styles.text}>
					This App was made for training and improving my knowledge of
					what's new in React Native development, but if you'd like to
					get in touch, to network or talk about React Native or the
					Javascript ecosystem, feel free to send me an email so we
					can exchange ideas about technology.
					{`\n\n`}
				</Text>
				<View style={styles.containerEmail}>
					<View
						style={{
							flex: 2,
							justifyContent: "center",
							width: windowWidth,
							alignItems: "center",
						}}>
						<Text
							style={{
								justifyContent: "center",
								width: windowWidth,
								alignItems: "center",
								color: "#fff",
								fontSize: 32,
								fontWeight: "bold",
								textAlign: "center",
							}}>
							Headbanger Forever
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
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() =>
							Linking.openURL("mailto:astronomi@gmail.com")
						}>
						<Icon name='email' size={50} color={"#900"} />
					</TouchableOpacity>
				</View>
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
		flex: 2,
		width: windowWidth,
		alignItems: "center",
	},
	containerEmail: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		marginBottom: 20,
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
