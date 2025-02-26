import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

const windowWidth = Dimensions.get("window").width;

export function FaqsScreen() {
	const [question01, setQuestion01] = useState(false);
	const [question02, setQuestion02] = useState(false);
	const [question03, setQuestion03] = useState(false);
	const [question04, setQuestion04] = useState(false);
	const [question05, setQuestion05] = useState(false);
	const [question06, setQuestion06] = useState(false);
	const [question07, setQuestion07] = useState(false);

	const question1 = () => {
		setQuestion01(true);
		setQuestion02(false);
		setQuestion03(false);
		setQuestion04(false);
		setQuestion05(false);
		setQuestion06(false);
		setQuestion07(false);
	};

	const question2 = () => {
		setQuestion01(false);
		setQuestion02(true);
		setQuestion03(false);
		setQuestion04(false);
		setQuestion05(false);
		setQuestion06(false);
		setQuestion07(false);
	};

	const question3 = () => {
		setQuestion01(false);
		setQuestion02(false);
		setQuestion03(true);
		setQuestion04(false);
		setQuestion05(false);
		setQuestion06(false);
		setQuestion07(false);
	};

	const question4 = () => {
		setQuestion01(false);
		setQuestion02(false);
		setQuestion03(false);
		setQuestion04(true);
		setQuestion05(false);
		setQuestion06(false);
		setQuestion07(false);
	};

	const question5 = () => {
		setQuestion01(false);
		setQuestion02(false);
		setQuestion03(false);
		setQuestion04(false);
		setQuestion05(true);
		setQuestion06(false);
		setQuestion07(false);
	};

	const question6 = () => {
		setQuestion01(false);
		setQuestion02(false);
		setQuestion03(false);
		setQuestion04(false);
		setQuestion05(false);
		setQuestion06(true);
		setQuestion07(false);
	};

	const question7 = () => {
		setQuestion01(false);
		setQuestion02(false);
		setQuestion03(false);
		setQuestion04(false);
		setQuestion05(false);
		setQuestion06(false);
		setQuestion07(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Q&A</Text>
			<ScrollView>
				<View style={styles.containerQuestion}>
					<TouchableOpacity onPress={question1}>
						<Text style={styles.subTitle}>
							{`Question 01: \n Do you like metal? If so, what's your favorite style?`}
						</Text>
					</TouchableOpacity>
					{question01 ? (
						<View style={styles.containerQuestionClick}>
							<Icon
								name='check'
								size={20}
								color={"#ccc"}
								style={styles.questionClick}
							/>
							<Text style={styles.text}>Answer 01</Text>
						</View>
					) : null}
				</View>

				<View style={styles.containerQuestion}>
					<TouchableOpacity onPress={question2}>
						<Text style={styles.subTitle}>
							{
								"Question 02: \n Do you still like metal, like in your teens?"
							}
						</Text>
					</TouchableOpacity>
					{question02 ? (
						<View style={styles.containerQuestionClick}>
							<Icon
								name='check'
								size={20}
								color={"#ccc"}
								style={styles.questionClick}
							/>
							<Text style={styles.text}>Answer 02</Text>
						</View>
					) : null}
				</View>

				<View style={styles.containerQuestion}>
					<TouchableOpacity onPress={question3}>
						<Text style={styles.subTitle}>
							{
								"Question 03: \n When did you start listening to metal?"
							}
						</Text>
					</TouchableOpacity>
					{question03 ? (
						<View style={styles.containerQuestionClick}>
							<Icon
								name='check'
								size={20}
								color={"#ccc"}
								style={styles.questionClick}
							/>
							<Text style={styles.text}>Answer 03</Text>
						</View>
					) : null}
				</View>

				<View style={styles.containerQuestion}>
					<TouchableOpacity onPress={question4}>
						<Text style={styles.subTitle}>
							{
								"Question 04: \n Do you still listen to metal every day?"
							}
						</Text>
					</TouchableOpacity>
					{question04 ? (
						<View style={styles.containerQuestionClick}>
							<Icon
								name='check'
								size={20}
								color={"#ccc"}
								style={styles.questionClick}
							/>
							<Text style={styles.text}>Answer 04</Text>
						</View>
					) : null}
				</View>

				<View style={styles.containerQuestion}>
					<TouchableOpacity onPress={question5}>
						<Text style={styles.subTitle}>
							{
								"Question 05: \n What's your favorite style? Heavy, Doom, Black, Thrash ... "
							}
						</Text>
					</TouchableOpacity>
					{question05 ? (
						<View style={styles.containerQuestionClick}>
							<Icon
								name='check'
								size={20}
								color={"#ccc"}
								style={styles.questionClick}
							/>
							<Text style={styles.text}>Answer 05</Text>
						</View>
					) : null}
				</View>

				<View style={styles.containerQuestion}>
					<TouchableOpacity onPress={question6}>
						<Text style={styles.subTitle}>
							{"Question 06: \n What was your first metal album?"}
						</Text>
					</TouchableOpacity>
					{question06 ? (
						<View style={styles.containerQuestionClick}>
							<Icon
								name='check'
								size={20}
								color={"#ccc"}
								style={styles.questionClick}
							/>
							<Text style={styles.text}>Answer 06</Text>
						</View>
					) : null}
				</View>

				<View style={styles.containerQuestion}>
					<TouchableOpacity onPress={question7}>
						<Text style={styles.subTitle}>
							{
								"Question 07: \n What's your favorite song of all time?"
							}
						</Text>
					</TouchableOpacity>
					{question07 ? (
						<View style={styles.containerQuestionClick}>
							<Icon
								name='check'
								size={20}
								color={"#ccc"}
								style={styles.questionClick}
							/>
							<Text style={styles.text}>Answer 07</Text>
						</View>
					) : null}
				</View>
			</ScrollView>
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
	containerQuestion: {
		width: windowWidth,
		marginBottom: 10,
	},
	title: {
		width: windowWidth,
		color: "#fff",
		fontSize: 22,
		padding: 10,
		marginTop: 10,
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "#f90000",
	},
	subTitle: {
		width: windowWidth,
		color: "#fff",
		fontSize: 16,
		padding: 10,
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "#1e1b1b",
	},
	text: {
		width: "100%",
		color: "#fff",
		fontSize: 16,
		padding: 10,
		marginBottom: 10,
		textAlign: "justify",
	},
	textBold: {
		width: "100%",
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		padding: 10,
		textAlign: "justify",
	},
	questionClick: {
		paddingRight: 0,
		alignItems: "center",
	},
	containerQuestionClick: {
		flexDirection: "row",
	},
});
