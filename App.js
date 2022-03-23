import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro/components/AR/ViroARSceneNavigator';
import { ViroARScene } from '@viro-community/react-viro/components/AR/ViroARScene';
import { ViroText } from '@viro-community/react-viro/components/ViroText';
import { Viro3DObject } from '@viro-community/react-viro/components/Viro3DObject';

export default function App() {
	const MyARScene = () => {
		return (
			<ViroARScene>
				<ViroText
					text="Hello Neil"
					position={[0, 0, -5]}
					scale={[0.5, 0.5, 0.5]}
					color="#ff0000"
					width={2}
					height={2}
				/>
			</ViroARScene>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text>Open up Neil to start Hello World on your app!</Text>
			<ViroARSceneNavigator
				autofocus={true}
				initialScene={{
					scene: MyARScene,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
