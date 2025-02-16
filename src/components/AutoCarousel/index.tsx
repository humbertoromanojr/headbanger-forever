import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

export function AutoCarousel() {
	const [pagingEnabled, setPagingEnabled] = React.useState(true);

	const data = [
		{
			id: "14",
			name: "Carcass",
			country: "United Kingdom",
			location: "Liverpool, Merseyside, England",
			formedIn: "1986",
			yearsActive: "1986-1996, 2007-present",
			genre: "Goregrind/Grindcore (early); Melodic Death Metal/Death 'n' Roll (later)",
			themes: "Death, Gore, Pathology, Medical, Humour, Politics, Society",
			label: "Nuclear Blast",
			bandCover:
				"https://www.metal-archives.com/images/1/4/14_photo.jpg?2430",
		},

		{
			id: "141",
			name: "Death",
			country: "United States",
			location: "Altamonte Springs, Florida",
			formedIn: "1984",
			yearsActive: "1983-1984 (as Mantas), 1984-2001",
			genre: "Death Metal (early); Progressive Death Metal (later)",
			themes: "Death, Gore, Horror (early); Society, Enlightenment (later)",
			label: "Nuclear Blast",
			bandCover:
				"https://www.metal-archives.com/images/1/4/1/141_photo.jpg?5804",
		},
		{
			id: "34",
			name: "Candlemass",
			country: "Sweden",
			location: "Stockholm",
			formedIn: "1985",
			yearsActive:
				"1982-1984 (as Nemesis), 1985-1994, 1997-2002, 2004-present",
			genre: "Epic Doom Metal",
			themes: "Dark fantasy, Religion, Doom, Life, Death, Hell",
			label: "Napalm Records",
			bandCover:
				"https://www.metal-archives.com/images/3/4/34_photo.jpg?1351",
		},
		{
			id: "151",
			name: "My Dying Bride",
			country: "United Kingdom",
			location: "Bradford, West Yorkshire, England",
			formedIn: "1990",
			yearsActive: "1990-present",
			genre: "Doom/Death Metal (early); Gothic/Doom Metal (later)",
			themes: "Despair, Pain, Romance, Faithlessness, Tragedy",
			label: "Nuclear Blast",
			bandCover:
				"https://www.metal-archives.com/images/1/5/1/151_photo.jpg?1948",
		},
		{
			id: "68",
			name: "Morbid Angel",
			country: "United States",
			location: "Tampa, Florida",
			formedIn: "1984",
			yearsActive: "1983(as Ice),  1983-1984 (as Heretic), 1984-present",
			genre: "Death Metal",
			themes: "Death, Satanism, Blasphemy, Sumerian mythology, Occultism, Ancient Ones",
			label: "Silver Lining Music",
			bandCover:
				"https://www.metal-archives.com/images/6/8/68_photo.jpg?2756",
		},
		{
			id: "119273",
			name: "Crux Cullum",
			country: "Brazil",
			location:
				"Belo Horizonte, Minas Gerais (early); Vila Velha, Espírito Santo (later)",
			formedIn: "2007",
			yearsActive: "2007-2016, 2024-present (as Mordrom)",
			genre: "Death/Black Metal",
			themes: "Hate, Misanthropy, Anti-religion",
			label: "Anaites Records",
			bandCover:
				"https://www.metal-archives.com/images/1/1/9/2/119273_photo.jpg?5801",
		},
	];

	return (
		<View style={{ flex: 1 }}>
			<Carousel
				data={data}
				autoPlay={true}
				pagingEnabled={pagingEnabled}
				scrollAnimationDuration={5000}
				width={width}
				height={width}
				renderItem={({ item }) => (
					<>
						<View style={styles.renderItem}>
							<Image
								source={{
									uri: `${item.bandCover}`,
								}}
								resizeMode='cover'
								style={styles.image}
							/>
						</View>
						<Text style={styles.title}>{item.name}</Text>
						<Text style={styles.text}>
							Formed In: {item.formedIn} - {item.country}
						</Text>
					</>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	renderItem: {
		flex: 1,
		justifyContent: "center",
		overflow: "hidden",
	},
	image: {
		width: width,
		height: 300,
	},
	title: {
		width: "100%",
		color: "#fff",
		backgroundColor: "#1f1d1d",
		fontSize: 32,
		fontWeight: "bold",
		padding: 10,
		textAlign: "center",
	},
	text: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "normal",
		textAlign: "center",
	},
});
