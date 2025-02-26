import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity,
	ActivityIndicator,
	Image,
	Dimensions,
	ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../../services/api";
import { AutoCarousel } from "../../components/AutoCarousel";

const windowWidth = Dimensions.get("window").width;

interface RouteParams {
	genreId: string;
}

export function HomeScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	//const { genreId } = route.params;

	const [bandName, setBandName] = useState("");
	const [bandId, setBandId] = useState("");

	const [dataBand, setDataBand] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function loadBand() {
		try {
			setIsLoading(true);

			const response = await api
				.get(`/bands/${bandId}`)
				.then((response) => {
					const data = response.data;
					setDataBand([data]);

					setIsLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setIsLoading(false);
					Alert.alert(
						"Error",
						"Please try again more later! 1 loadBandId",
					);
				});
		} catch (error) {
			console.error("Error", error);
			setIsLoading(false);
			Alert.alert("Error", "Please try again more later! 2 loadBandId");
		}
	}

	useEffect(() => {
		if (bandId.length > 0) {
			loadBand();
			return () => {
				setIsLoading(false);
			};
		}
	}, [bandId]);

	const ListHeader = () => {
		return (
			<View style={styles.containerListHeader}>
				<Image
					resizeMode='contain'
					style={styles.imageListHeader}
					source={require("../../assets/images/metal-arquives-logo.jpg")}
				/>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<ListHeader />
			<ScrollView showsHorizontalScrollIndicator={false}>
				<View style={styles.containerCarousel}>
					<AutoCarousel />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		backgroundColor: "#000",
		alignItems: "center",
	},
	containerCarousel: {
		backgroundColor: "#000",
		alignItems: "center",
	},
	containerInfo: {
		width: windowWidth,
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
		backgroundColor: "#333",
	},
	text: {
		width: "100%",
		color: "#fff",
		fontSize: 22,
		padding: 10,
		textAlign: "justify",
	},
	containerListHeader: {
		paddingBottom: 20,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	imageListHeader: {
		width: windowWidth,
		height: 120,
		textAlign: "center",
		resizeMode: "cover",
	},
});
