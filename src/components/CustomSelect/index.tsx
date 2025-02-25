import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Modal,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

interface CustomSelectProps {
	options: string;
	onChangeSelect: string;
	text: string;
	selectName: string;
	selected: string;
}

export function CustomSelect({
	options,
	onChangeSelect,
	text,
	selectName,
	selected,
}: CustomSelectProps) {
	const [txt, setTxt] = useState(text);
	//const [selected, setSelected] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const renderOption = (item: string) => {
		return (
			<TouchableOpacity
				style={[
					styles.containerOptions,
					{
						backgroundColor: item.name === selected ? "#333" : null,
					},
				]}
				onPress={() => {
					onChangeSelect(item.name);
					setTxt(item.name);
					setModalVisible(false);
				}}>
				<Text
					style={[
						styles.optionsItems,
						{
							fontWeight:
								item.name === selected ? "bold" : "normal",
						},
						{
							fontSize: item.name === selected ? 22 : 18,
						},
					]}>
					{item.name}
				</Text>
				{item.name === selected && (
					<Icon
						name='check'
						size={30}
						color={"#fff"}
						style={{
							marginRight: 14,
						}}
					/>
				)}
			</TouchableOpacity>
		);
	};

	const _separatorItem = () => {
		return (
			<View>
				<View
					style={{
						borderBottomColor: "#fff",
						borderBottomWidth: 0.5,
					}}
				/>
			</View>
		);
	};

	return (
		<>
			<TouchableOpacity
				style={styles.container}
				onPress={() => setModalVisible(true)}>
				<>
					<Text style={styles.text} numberOfLines={1}>
						{txt}
					</Text>
					<Text style={styles.textArrowDown}>^</Text>
				</>
			</TouchableOpacity>
			<SafeAreaProvider>
				<SafeAreaView>
					<Modal
						animationType='slide'
						visible={modalVisible}
						onRequestClose={() => setModalVisible(false)}>
						<View style={styles.headerModal}>
							<TouchableOpacity
								onPress={() => setModalVisible(false)}>
								<Text style={styles.textArrow}>^</Text>
							</TouchableOpacity>
							<Text style={styles.modalTitle}>{selectName}</Text>
							<TouchableOpacity
								onPress={() => setModalVisible(false)}>
								<Text style={styles.modalCancel}>Cancelar</Text>
							</TouchableOpacity>
						</View>
						<FlatList
							data={options || []}
							keyExtractor={(item) => String(item.id)}
							renderItem={({ item }) => renderOption(item)}
							ItemSeparatorComponent={_separatorItem}
							style={{ backgroundColor: "#050505" }}
						/>
					</Modal>
				</SafeAreaView>
			</SafeAreaProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: "95%",
		backgroundColor: "#fff",
		paddingHorizontal: 22,
		paddingRight: 10,
		marginRight: 0,
		borderRadius: 8,
		borderWidth: 0.5,
		flexDirection: "row",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 16,
		color: "#111",
		textTransform: "uppercase",
	},
	textArrowDown: {
		fontSize: 42,
		color: "#111",
		fontWeight: "normal",
		paddingTop: 7,
		paddingRight: 10,
		transform: [{ scaleY: -1 }],
	},
	textArrow: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#111",
		marginLeft: 10,
		transform: [{ rotate: "-90deg" }],
	},
	headerModal: {
		height: 80,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		backgroundColor: "#f2f7ff",
		borderBottomColor: "#ddd",
		borderBottomWidth: 0.5,
		borderBottom: 12,
	},
	modalTitle: {
		fontSize: 22,
		color: "#111",
	},
	modalCancel: {
		fontSize: 18,
		color: "#111",
		marginRight: 10,
		fontWeight: "bold",
	},
	containerOptions: {
		flexDirection: "row",
		alignItems: "center",
		color: "#fff",
		paddingVertical: 20,
		justifyContent: "space-between",
	},
	optionsItems: {
		fontSize: 18,
		color: "#fff",
		paddingLeft: 20,
		textTransform: "uppercase",
		fontWeight: "normal",
	},
});
