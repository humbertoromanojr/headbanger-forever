import React from "react";
import {
	TextInput,
	View,
	Text,
	TextInputProps,
	StyleSheet,
} from "react-native";

type InputProps = TextInputProps & {
	title: string;
};

function CustomInput({ ...rest }: InputProps) {
	return (
		<TextInput
			style={styles.container}
			placeholderTextColor='#fff'
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "90%",
		backgroundColor: "#f00707",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 20,
		borderRadius: 50,
		color: "#ffffff",
		fontSize: 22,
	},
	label: { color: "#fff", fontSize: 16, textTransform: "uppercase" },
	textInput: { color: "#aaa", fontSize: 16, textTransform: "uppercase" },
});

export { CustomInput };
