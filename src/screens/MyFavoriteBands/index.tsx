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
	LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import { CustomInput } from "../../components/CustomInput";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function MyFavoriteBandsScreen() {
	const navigation = useNavigation();

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

	//console.log("dataBand :", dataBand);

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

	const backSearchBandName = () => {
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
			{dataBand.map((b) => (
				<ScrollView>
					<View key={b.id} style={styles.containerBand}>
						<Text style={styles.title}>{b.name}</Text>
						<Image
							style={styles.bandCover}
							resizeMode='cover'
							source={{
								uri: `${b.bandCover}`,
							}}
						/>
						<View style={styles.containerInfoBand}>
							<View>
								<Text style={styles.textBold}>
									Country:{" "}
									<Text style={styles.text}>{b.country}</Text>
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
								<Text style={styles.text}>{b.location}</Text>
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
				</ScrollView>
			))}
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
	containerInfoBand: { padding: 10 },
	title: {
		width: "100%",
		color: "#fff",
		fontSize: 42,
		fontWeight: "bold",
		paddingBottom: 10,
	},
	textBold: { color: "#fff", fontSize: 18, fontWeight: "bold" },
	text: { color: "#fff", fontSize: 16, fontWeight: "normal" },
	bandCover: {
		paddingBottom: 10,
		width: windowWidth,
		height: 300,
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
