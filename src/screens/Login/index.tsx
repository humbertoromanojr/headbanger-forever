import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Alert,
	ActivityIndicator,
	SafeAreaView,
	TouchableOpacity,
	Text,
	Dimensions,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { useAuth } from "../../contexts/Auth";

export function LoginScreen() {
	const navigation = useNavigation();
	const { signIn } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = React.useState(false);

	async function handleAccessCredential() {
		try {
			setIsLoading(true);

			if (!password.trim() || !email.trim()) {
				return Alert.alert("Inscrição", "Preencha todos os campos!!!");
			}
			console.log("------ SignIn ok ----- ", signIn);
			signIn(email, password);
			setIsLoading(false);
		} catch (error) {
			Alert.alert("Ingresso", "Não foi possível encontrá-lo!");
			setIsLoading(false);
			console.error("==> SignIn: ", error);
		}
	}

	const handleRegister = () => {
		navigation.navigate("SignIn");
	};

	const ListHeader = () => {
		return (
			<View style={styles.containerListHeader}>
				<Image
					resizeMode='contain'
					style={styles.imageListHeader}
					source={require("../../assets/images/hand-headbanguer.png")}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ListHeader />
			{!isLoading ? (
				<>
					<CustomInput
						title='Email'
						placeholder='Email'
						placeholderTextColor='#fff'
						value={email}
						keyboardType='default'
						autoCapitalize='none'
						onChangeText={setEmail}
					/>
					<CustomInput
						title='Senha'
						placeholderTextColor='#fff'
						placeholder='Password'
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
					<CustomButton
						onPress={() => handleAccessCredential()}
						title='Login'
						isLoading={isLoading}
					/>

					<TouchableOpacity
						onPress={handleRegister}
						style={styles.buttonClick}>
						<Text style={styles.text}>I'm not Register</Text>
					</TouchableOpacity>
				</>
			) : (
				<ActivityIndicator size={"large"} color='#fff' />
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center",
	},
	title: { color: "#fff", fontSize: 22 },
	buttonClick: {
		marginTop: 50,
		backgroundColor: "#444",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 50,
	},
	text: { color: "#fff", fontSize: 18 },
	containerListHeader: {
		paddingBottom: 20,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	imageListHeader: {
		width: 120,
		height: 120,
		margin: 20,
		textAlign: "center",
		resizeMode: "cover",
	},
});
