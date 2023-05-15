import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { trpc } from "../../utils/trpc";

type Props = {};

const Home = (props: Props) => {
	const userQuery = trpc.hello.useQuery("dude");
	// console.log(trpc.hello.useQuery("name").trpc.path);
	// console.log(trpc.hello.useQuery("hi").error);
	return (
		<View style={styles.container}>
			<Text>
				Open up App.tsx to start working on your app! {userQuery?.data}
			</Text>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
