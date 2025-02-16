import React, { useEffect, useState } from "react";
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

type FavoriteGenresProps = {
	id: number | undefined;
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

	async function loadGenreFavorites() {
		try {
			if (genreName == "" || genreName == null) {
				Alert.alert("Error", "Please enter a Genre name!");
				return;
			}

			setIsLoading(true);

			const response = await api
				.get(`/search/bands/genre/${genreName}`)
				.then((response) => {
					if (response.data.length > 0) {
						const data = response.data;
						setDataGenreFavorites([data]);

						console.log("genre Name: ", data[0].genre);

						setHiddenForm(false);
					} else {
						setIsLoading(false);

						Alert.alert("Error", "No Genre found with this name! ");
						return;
					}

					setIsLoading(false);
					setGenreName("");
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

	useEffect(() => {
		setGenreName("Death Metal");
		loadGenreFavorites();
	}, []);

	console.log("dataGenreFavorites :", dataGenreFavorites);
	console.log("genreName :", genreName);

	const backSearchFavoriteGenres = () => {
		setHiddenForm(true);
		setDataGenreFavorites([]);
	};

	const GenresHeader = () => {
		return (
			<View style={styles.containerGenresHeader}>
				<Image
					resizeMode='contain'
					style={styles.imageGenresHeader}
					source={require("../../assets/images/metal-arquives-logo.jpg")}
				/>
			</View>
		);
	};

	const GenreSeparatorItems = () => {
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

	function GenresItem(item: any) {
		return (
			<View key={item.id} style={styles.containerBand}>
				<Text style={styles.title}>{item.name}</Text>
				<Image
					style={styles.bandCover}
					resizeMode='cover'
					source={{
						uri: `${item.link}`,
					}}
				/>
				<View style={styles.containerInfoBand}>
					<Text style={styles.textBold}>
						Country: <Text style={styles.text}>{item.country}</Text>
					</Text>
					<Text style={styles.textBold}>
						Genre: <Text style={styles.text}>{item.genre}</Text>
					</Text>
				</View>
			</View>
		);
	}

	function renderItem({ item }: any) {
		return <GenresItem {...item} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			{hiddenForm ? (
				<View style={styles.containerForm}>
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
					<Text style={styles.backButtonBandName}>
						{" "}
						Back Search your favorite Genres
					</Text>
				</TouchableOpacity>
			)}

			<FlatList
				data={dataGenreFavorites}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={GenresHeader}
				ItemSeparatorComponent={GenreSeparatorItems}
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
		paddingVertical: 20,
	},
	containerBand: {
		padding: 0,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	containerInfoBand: { padding: 0 },
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
	containerGenresHeader: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	imageGenresHeader: {
		width: windowWidth,
		height: 120,
		textAlign: "center",
		resizeMode: "cover",
	},
});
