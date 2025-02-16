import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";

import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { useAuth } from "../../contexts/Auth";
export function SignInScreen() {
	const { signIn, isLoading } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleAccessCredential() {
		try {
			if (!password.trim() || !email.trim()) {
				return Alert.alert("Inscrição", "Preencha todos os campos!!!");
			}
			console.log("------ SignIn ok ----- ", signIn);
			signIn(email, password);
		} catch (error) {
			Alert.alert("Ingresso", "Não foi possível encontrá-lo!");
			console.error("==> SignIn: ", error);
		}
	}

	return (
		<View style={styles.container}>
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
			{isLoading ? (
				<ActivityIndicator size={"large"} color='#fff' />
			) : (
				<CustomButton
					onPress={() => handleAccessCredential()}
					title='Register'
					isLoading={isLoading}
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
		justifyContent: "center",
	},
	title: { color: "#fff", fontSize: 22 },
});
