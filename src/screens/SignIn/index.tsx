import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Alert,
	ActivityIndicator,
	SafeAreaView,
} from "react-native";

import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { useAuth } from "../../contexts/Auth";
export function SignInScreen() {
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

	return (
		<SafeAreaView style={styles.container}>
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
						title='Register'
						isLoading={isLoading}
					/>
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
});
