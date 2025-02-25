import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity,
	ActivityIndicator,
	Image,
	SafeAreaView,
	Dimensions,
	LogBox,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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
};

export function MyFavoriteGenresScreen() {
	const navigation = useNavigation();

	const [genreName, setGenreName] = useState("");

	const [dataGenreFavorites, setDataGenreFavorites] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [hiddenForm, setHiddenForm] = useState(true);

	function loadGenreFavorites() {
		console.log("loadGenreFavorites ----> ", genreName);

		if (genreName == "" || genreName == null) {
			Alert.alert("Error", "Please enter a Genre name!");
			return;
		}

		setIsLoading(true);

		try {
			fetch(`https://metal-api.dev/search/bands/genre/${genreName}`, {
				method: "GET",
			})
				.then(async (response) => {
					const res = await response.json();

					console.log("data Album Name: ", res);

					setDataGenreFavorites(res);
					setHiddenForm(false);
					setIsLoading(false);
					setGenreName("");
				})
				.catch((error) => {
					console.error(
						"Error then catch MyFavoriteGenresScreen: ",
						error,
					);
					setIsLoading(false);
					setGenreName("");
					Alert.alert("Error", "Please try again more later!");
				})
				.finally(() => setIsLoading(false));
		} catch (error) {
			console.log("Error try catch MyFavoriteGenresScreen: ", error);
			setIsLoading(false);
			setGenreName("");
			Alert.alert("Error", "Please try again more later!");
		}
	}

	const backSearchFavoriteGenres = () => {
		setHiddenForm(true);
		setDataGenreFavorites([]);
	};

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

	const SeparatorItems = () => {
		return (
			<View style={{ width: windowWidth }}>
				<View
					style={{
						borderBottomWidth: 1,
						borderBottomColor: "#aaa",
					}}
				/>
			</View>
		);
	};

	function seeMyFavoriteBand(item: string) {
		navigation.setParams({ item });

		navigation.navigate("My Favorite Band Details", { item });
	}

	function GenresItem(item: any) {
		return (
			<TouchableOpacity
				key={item.id}
				style={styles.containerBand}
				onPress={() => seeMyFavoriteBand(item.id)}>
				<View style={styles.containerTitle}>
					<Text style={styles.title}>{item.name}</Text>
				</View>
				<View style={styles.containerInfoBand}>
					<Text style={styles.textBold}>
						Country: <Text style={styles.text}>{item.country}</Text>
					</Text>
					<Text style={styles.textBold}>
						Genre: <Text style={styles.text}>{item.genre}</Text>
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	function renderItem({ item }: any) {
		return <GenresItem {...item} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			{hiddenForm ? (
				<View style={styles.containerForm}>
					<ListHeader />
					<CustomInput
						title='Genre Name'
						placeholder='Genre Name'
						placeholderTextColor='#fff'
						value={genreName}
						onChangeText={setGenreName}
					/>

					<TouchableOpacity
						activeOpacity={0.7}
						disabled={isLoading}
						style={styles.button}
						onPress={() => loadGenreFavorites()}>
						{isLoading ? (
							<ActivityIndicator size={"large"} color='#fff' />
						) : (
							<Text style={styles.buttonText}>
								Search your favorite Genres
							</Text>
						)}
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity onPress={backSearchFavoriteGenres}>
					<ListHeader />
					<Text style={styles.backButtonBandName}>
						{" "}
						Back Search your favorite Genres
					</Text>
				</TouchableOpacity>
			)}

			<FlatList
				data={dataGenreFavorites}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={SeparatorItems}
				renderItem={renderItem}
			/>
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
		paddingBottom: 20,
	},
	containerBand: {
		width: windowWidth,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	containerInfoBand: { width: windowWidth, paddingVertical: 10 },
	containerTitle: {
		width: windowWidth,
		backgroundColor: "#1f1d1d",
		paddingVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	title: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
		paddingBottom: 0,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
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
