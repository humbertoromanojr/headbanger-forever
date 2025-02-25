import React, { useCallback, useEffect, useState } from "react";
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
	LogBox,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../../services/api";
import { CustomInput } from "../../components/CustomInput";

const windowWidth = Dimensions.get("window").width;

type FavoriteBandsProps = {
	id: string | undefined;
	name: string | undefined;
	image: string | undefined;
	link: string | undefined;
	genre: string | undefined;
	country: string | undefined;
	bandCover: string | undefined;
	formedIn: string | undefined;
	label: string | undefined;
	themes: string | undefined;
	location: string | undefined;
	yearsActive: string | undefined;
};

type RouteParams = {
	item: string;
};

export function MyFavoriteBandDetailsScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	const { item } = route.params as RouteParams;

	const [bandName, setBandName] = useState("");
	const [bandId, setBandId] = useState("");

	const [dataBand, setDataBand] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [hiddenForm, setHiddenForm] = useState(true);

	async function loadBandName() {
		try {
			if (bandName == "" || bandName == null) {
				Alert.alert("Error", "Please enter a band name!");
				return;
			}

			setIsLoading(true);

			const response = await api
				.get(`/search/bands/name/${bandName}`)
				.then((response) => {
					if (response.data.length > 0) {
						const getBandName = response.data;
						setBandName(getBandName[0].name);
						setBandId(getBandName[0].id);

						console.log("loadBandName name: ", getBandName[0].name);
						console.log("loadBandName id :", getBandName[0].id);

						setHiddenForm(false);
					} else {
						setIsLoading(false);

						Alert.alert("Error", "No bands found with this name! ");
						return;
					}

					setIsLoading(false);
					setBandName("");
				})
				.catch((error) => {
					console.error(error);
					setIsLoading(false);
					Alert.alert(
						"Error",
						"Please try again more later! 1 loadBandNames",
					);
				});
		} catch (error) {
			console.error("Error", error);
			setIsLoading(false);
			Alert.alert(
				"Error",
				"Please try again more later! 2 loadBandNames",
			);
		}
	}

	async function loadBand() {
		setIsLoading(true);

		if (item == null || item == undefined || item == "") {
			Alert.alert("Error", "Please band id is null, please try again!");
			return;
		}
		try {
			console.log("selectedBandId MyFavoriteBandDetails =>", item);
			const response = await api
				.get(`/bands/${item}`)
				.then((response) => {
					const data = response.data;
					setDataBand([data]);

					console.log("loadBand =>", item);

					setIsLoading(false);
					setHiddenForm(false);
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
		loadBand();

		setHiddenForm(false);
	}, [item]);

	const backSearchBandName = () => {
		navigation.navigate("My Favorite Genres", { item });

		setHiddenForm(true);
		setDataBand([]);
	};

	return (
		<View style={styles.container}>
			{hiddenForm ? (
				<View style={styles.containerForm}>
					<CustomInput
						title='Band Name'
						placeholder='Band Name'
						placeholderTextColor='#fff'
						value={bandName}
						onChangeText={setBandName}
					/>

					<TouchableOpacity
						activeOpacity={0.7}
						disabled={isLoading}
						style={styles.button}
						onPress={() => loadBandName()}>
						{isLoading ? (
							<ActivityIndicator size={"large"} color='#fff' />
						) : (
							<Text style={styles.buttonText}>
								Search your favorite bands
							</Text>
						)}
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity onPress={backSearchBandName}>
					<Text style={styles.backButtonBandName}>
						{" "}
						Back Search band name
					</Text>
				</TouchableOpacity>
			)}

			{isLoading ? (
				<View style={styles.containerLoading}>
					<ActivityIndicator size={"large"} color='#fff' />
				</View>
			) : (
				<ScrollView>
					{dataBand.map((b: FavoriteBandsProps) => (
						<View key={b.id} style={styles.containerBand}>
							<Text style={styles.title}>{b.name}</Text>
							{b.bandCover ? (
								<Image
									style={styles.bandCover}
									resizeMode='cover'
									source={{
										uri: `${b.bandCover}`,
									}}
								/>
							) : (
								<Image
									style={styles.bandCover}
									resizeMode='cover'
									source={require("../../assets/images/without-image.jpg")}
								/>
							)}

							<View style={styles.containerInfoBand}>
								<View>
									<Text style={styles.textBold}>
										Country:{" "}
										<Text style={styles.text}>
											{b.country}
										</Text>
									</Text>
									<Text style={styles.textBold}>
										Formed:{" "}
										<Text style={styles.text}>
											{b.formedIn}
										</Text>
									</Text>
								</View>
								<Text style={styles.textBold}>
									Genre:{" "}
									<Text style={styles.text}>{b.genre}</Text>
								</Text>
								<Text style={styles.textBold}>
									Label:{" "}
									<Text style={styles.text}>{b.label}</Text>
								</Text>

								<Text style={styles.textBold}>
									Location:{" "}
									<Text style={styles.text}>
										{b.location}
									</Text>
								</Text>
								<Text style={styles.textBold}>
									Themes:{" "}
									<Text style={styles.text}>{b.themes}</Text>
								</Text>
								<Text style={styles.textBold}>
									YearsActive:{" "}
									<Text style={styles.text}>
										{b.yearsActive.replace(/\s+/g, "")}
									</Text>
								</Text>
							</View>
						</View>
					))}
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	containerLoading: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
	button: {
		width: "90%",
		backgroundColor: "#7c0907",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 22,
		padding: 10,
	},
	containerForm: {
		width: "100%",
		backgroundColor: "#1f1d1d",
		justifyContent: "flex-start",
		alignItems: "center",
		alignSelf: "center",
		paddingVertical: 20,
	},
	containerBand: {
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	containerInfoBand: {
		width: windowWidth,
		paddingVertical: 10,
		textAlign: "left",
	},
	title: {
		width: "100%",
		color: "#fff",
		fontSize: 42,
		fontWeight: "bold",
		paddingBottom: 10,
	},
	textBold: {
		color: "#fff",
		fontSize: 22,
		paddingBottom: 10,
		fontWeight: "bold",
	},
	text: { color: "#fff", fontSize: 20, fontWeight: "normal" },
	bandCover: {
		paddingBottom: 10,
		width: windowWidth,
		height: windowWidth,
	},
	backButtonBandName: {
		width: windowWidth,
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		backgroundColor: "#f20905",
		padding: 10,
	},
});
