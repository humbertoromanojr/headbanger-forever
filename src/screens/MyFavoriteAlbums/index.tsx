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
	ScrollView,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import { CustomInput } from "../../components/CustomInput";

const windowWidth = Dimensions.get("window").width;

type FavoriteAlbumsProps = {
	id: string | undefined;
	title: string | undefined;
	link: string | undefined;
	date: string | undefined;
	type: string | undefined;
	band: string | undefined;
	country: string | undefined;
	genre: string | undefined;
};

export function MyFavoriteAlbumsScreen() {
	const navigation = useNavigation();

	const [albumName, setAlbumName] = useState("");

	const [dataFavoriteAlbums, setDataFavoriteAlbums] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [selectedBandId, setSelectedBandId] = useState("");

	const [hiddenForm, setHiddenForm] = useState(true);

	function loadFavoriteAlbums() {
		if (albumName == "" || albumName == null) {
			Alert.alert("Error", "Please enter a Genre name!");
			return;
		}

		setIsLoading(true);

		try {
			fetch(`https://metal-api.dev/search/albums/title/${albumName}`, {
				method: "GET",
			})
				.then(async (response) => {
					const res = await response.json();

					console.log("data Album Name: ", res);

					setDataFavoriteAlbums(res);
					setHiddenForm(false);
					setIsLoading(false);
					setAlbumName("");
				})
				.catch((error) => {
					console.error(
						"Error then catch loadFavoriteAlbums2: ",
						error,
					);
					setIsLoading(false);
					setAlbumName("");
					Alert.alert("Error", "Please try again more later!");
				})
				.finally(() => setIsLoading(false));
		} catch (error) {
			console.log("Error try catch loadFavoriteAlbums2: ", error);
			setIsLoading(false);
			setAlbumName("");
			Alert.alert("Error", "Please try again more later!");
		}
	}

	//console.log("dataFavoriteAlbums :", dataFavoriteAlbums);

	const backSearchFavoriteAlbums = () => {
		setHiddenForm(true);
		setDataFavoriteAlbums([]);
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
						padding: 5,
					}}
				/>
			</View>
		);
	};

	function seeMyFavoriteBand(item: FavoriteAlbumsProps) {
		//console.log("MyFavoriteAlbums - item.id: ", item);

		setSelectedBandId(item);

		navigation.setParams({ item });

		navigation.navigate("My Favorite Band Details", { item });
	}

	function GenresItem(item: FavoriteAlbumsProps) {
		return (
			<TouchableOpacity
				key={item.id}
				style={styles.containerBand}
				onPress={() => seeMyFavoriteBand(item.id)}>
				<View style={styles.containerTitle}>
					<Text style={styles.title}>{item.band.name}</Text>
				</View>

				<View style={styles.containerInfoBand}>
					<Text style={styles.textBold}>
						Album: <Text style={styles.text}>{item.title}</Text>
					</Text>
					<Text style={styles.textBold}>
						Type: <Text style={styles.text}>{item.type}</Text>
					</Text>
					<Text style={styles.textBold}>
						Genre:{" "}
						<Text style={styles.text}>{item.band.genre}</Text>
					</Text>
					<Text style={styles.textBold}>
						Country:{" "}
						<Text style={styles.text}>{item.band.country}</Text>
					</Text>
					<Text style={styles.textBold}>
						Date: <Text style={styles.text}>{item.date}</Text>
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
						title='Album Name'
						placeholder='Album Name'
						placeholderTextColor='#fff'
						value={albumName}
						onChangeText={setAlbumName}
					/>

					<TouchableOpacity
						activeOpacity={0.7}
						disabled={isLoading}
						style={styles.button}
						onPress={() => loadFavoriteAlbums()}>
						{isLoading ? (
							<ActivityIndicator size={"large"} color='#fff' />
						) : (
							<Text style={styles.buttonText}>
								Search your favorite Albums
							</Text>
						)}
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity onPress={backSearchFavoriteAlbums}>
					<ListHeader />
					<Text style={styles.backButton}>
						{" "}
						Back Search your favorite Album
					</Text>
				</TouchableOpacity>
			)}

			<FlatList
				data={dataFavoriteAlbums}
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
		width: "100%",
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
		paddingVertical: 0,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	containerInfoBand: {
		width: windowWidth,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	containerTitle: {
		width: windowWidth,
		backgroundColor: "#1f1d1d",
		paddingVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#aaa",
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
	backButton: {
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
