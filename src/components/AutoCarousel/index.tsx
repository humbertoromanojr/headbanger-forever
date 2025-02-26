import * as React from "react";
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";

const width = Dimensions.get("window").width;

interface BandProps {
	id: string;
	name: string;
	bandCover: string;
	item: string | undefined;
}

interface changeBandsIntervalsProps {
	changeBandsIntervals: any;
}

export function AutoCarousel({ genreId }) {
	const navigation = useNavigation();

	const [pagingEnabled, setPagingEnabled] = React.useState(true);
	const [bandsId, setBandsId] = React.useState([]);
	const [bands, setBands] = React.useState([]);

	const [genreName, setGenreName] = React.useState("Death");

	const [isLoading, setIsLoading] = React.useState(false);

	const [changeBands, setChangeBands] = React.useState(0);

	React.useEffect(() => {
		loadBand();
	}, []);

	React.useEffect(() => {
		updatedBandsCarousel();
	}, []);

	let count = 0;
	const updatedBandsCarousel = () => {
		setInterval(() => {
			count++;

			loadBand();
			console.log("------ setInterval - setInterval -----> ");

			setChangeBands(count);
		}, 60000 * 3);
		setChangeBands(count);
	};

	console.log("----- ChangeBands ------ ", changeBands);

	async function loadBand() {
		setChangeBands(count);
		try {
			fetch(`https://metal-api.dev/search/bands/genre/${genreName}`, {
				method: "GET",
			})
				.then(async (response) => {
					setIsLoading(true);
					console.log("----- get BandId ------ ");
					const res = await response.json();
					setBandsId([res]);

					setGenreName(genreName);

					// get ID bands
					const bandIds = await res.map((item: BandProps) => {
						item.id;

						return {
							id: item.id,
						};
					});
					setBandsId(bandIds);
					setIsLoading(false);

					let i = 0;
					const allBands = [];

					if (changeBands == 0 || changeBands == null) {
						console.log(
							"----- ChangeBands === 000000 ------ ",
							changeBands,
						);
						for (i = 0; i <= bandIds.length && i <= 10; i++) {
							const response = await api
								.get(`/bands/${bandIds[i].id}`)
								.then((response) => {
									setIsLoading(true);
									const data = response.data;

									allBands.push(data);

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
						}
					} else if (changeBands != 0 || changeBands != null) {
						console.log(
							"----- ChangeBands !== 000000 ------ ",
							changeBands,
						);
						for (
							i = changeBands + 1;
							i <= bandIds.length && i <= changeBands + 10;
							i++
						) {
							const response = await api
								.get(`/bands/${bandIds[i].id}`)
								.then((response) => {
									setIsLoading(true);
									const data = response.data;

									allBands.push(data);
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
						}
					}

					const filterBands = allBands.map((b: BandProps) => {
						b.id, b.name, b.bandCover;

						return {
							id: b.id,
							name: b.name,
							bandCover: b.bandCover,
						};
					});

					console.log("Bands filterBands -----> ", filterBands);

					setBands(filterBands);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error("Error then catch Fetch Bands: ", error);

					Alert.alert("Error", "Please try again more later!");
					setIsLoading(false);
				})
				.finally(() => {
					console.log("finally");
					setIsLoading(false);
				});
		} catch (error) {
			console.error("Error", error);
			setIsLoading(false);
			Alert.alert("Error", "Please try again more later! 2 loadBandId");
		}
	}

	React.useEffect(() => {
		loadBand();
	}, []);

	const RenderItem = (item: BandProps) => {
		return (
			<TouchableOpacity
				key={item.id}
				onPress={() => seeMyFavoriteBand(item.id)}>
				<View style={styles.renderItem}>
					{item.bandCover ? (
						<Image
							style={styles.image}
							resizeMode='cover'
							source={{
								uri: `${item.bandCover}`,
							}}
						/>
					) : (
						<Image
							style={styles.image}
							resizeMode='cover'
							source={require("../../assets/images/without-image.jpg")}
						/>
					)}
					<Text style={styles.title}>{item.name}</Text>
					<Text style={styles.title}>&nbsp;</Text>
				</View>
			</TouchableOpacity>
		);
	};

	function seeMyFavoriteBand(item: string) {
		navigation.setParams({ item });

		navigation.navigate("My Favorite Band Details", { item });

		console.log("MyFavoriteGenres - item.id: ", item);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.textBold}>
				Bands&nbsp;{genreName}&nbsp;Metal
			</Text>

			{!isLoading ? (
				<Carousel
					data={bands}
					autoPlay={true}
					pagingEnabled={pagingEnabled}
					scrollAnimationDuration={5000}
					mode='parallax'
					modeConfig={{
						parallaxScrollingScale: 0.9,
						parallaxScrollingOffset: 50,
					}}
					width={width}
					height={width}
					renderItem={({ item }) => <RenderItem {...item} />}
				/>
			) : (
				<ActivityIndicator
					size={"large"}
					color='#fff'
					style={{
						alignItems: "center",
						justifyContent: "center",
						marginTop: 70,
					}}
				/>
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
	renderItem: {
		alignItems: "center",
		justifyContent: "center",
	},
	image: { width: width, height: width },
	title: {
		width: "100%",
		height: 90,
		color: "#fff",
		backgroundColor: "#000",
		fontSize: 32,
		padding: 5,
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 2,
	},
	textBold: {
		color: "#fff",
		fontSize: 16,
		padding: 5,
		fontWeight: "bold",
		textAlign: "center",
	},
	text: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "#1f1d1d",
		marginLeft: 2,
	},
});
