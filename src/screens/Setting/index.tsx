import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomSelect } from "../../components/CustomSelect";

const windowWidth = Dimensions.get("window").width;

export function SettingScreen() {
	const navigation = useNavigation();

	const [selectedGenreId, setSelectedGenreId] = useState("");

	const sedGenreIdHome = (genreId: string) => {
		navigation.setParams({ genreId });

		navigation.navigate("Home", { genreId });

		setSelectedGenreId(genreId);
	};

	const data = [
		{ id: "1", name: "Heavy" },
		{ id: "2", name: "Thrash" },
		{ id: "3", name: "Death" },
		{ id: "4", name: "Doom" },
		{ id: "5", name: "Black" },
		{ id: "6", name: "Speed" },
		{ id: "7", name: "Sludge" },
		{ id: "8", name: "Power" },
		{ id: "9", name: "Folk" },
		{ id: "10", name: "Blackened" },
		{ id: "11", name: "Dark" },
		{ id: "12", name: "Crossover" },
		{ id: "13", name: "Viking" },
		{ id: "14", name: "Grindcore" },
		{ id: "15", name: "Goregrind" },
		{ id: "16", name: "Stoner" },
		{ id: "17", name: "Industrial" },
	];

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.titleSmall}>
						{`Select which style you want to \nchange in the Home Carousel?`}
					</Text>
					<CustomSelect
						options={data}
						text='Select your favorite Genre'
						selected={selectedGenreId}
						onChangeSelect={(id) => sedGenreIdHome(id)}
						style={{ width: "90%" }}
					/>
				</View>
				<View style={styles.containerInfo}>
					<Text style={styles.title}>Planned Features</Text>
					<Text style={styles.text}>
						If you want to change the Carousel settings above, click
						on the menu above and then on settings.
					</Text>
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
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	containerInfo: {
		width: windowWidth,
		alignItems: "center",
		marginTop: 20,
		backgroundColor: "#000",
	},
	titleSmall: {
		color: "#fff",
		fontSize: 22,
		textAlign: "center",
		marginVertical: 10,
	},
	title: {
		width: windowWidth,
		color: "#fff",
		fontSize: 32,
		padding: 10,
		marginTop: 10,
		fontWeight: "bold",
		textAlign: "center",
		alignItems: "center",
		backgroundColor: "#333",
	},
	text: {
		width: "100%",
		color: "#fff",
		fontSize: 22,
		paddingVertical: 10,
		textAlign: "justify",
	},
});
