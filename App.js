import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Intro from './components/Intro';
import { LogBox } from 'react-native';
import {
	NavigationContainer,
	useNavigation,
	StackActions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/Main';
import Camera from './components/Camera';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// LogBox.ignoreLogs(['componentWillMount']);

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			{
				// eslint-disable-next-line react/style-prop-object
				<StatusBar style="auto" />
			}
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				detachInactiveScreens={false}
			>
				<Stack.Screen name="Landing" component={Intro} />
				<Stack.Screen name="Home" component={Main} />
				<Stack.Screen
					name="Camera"
					options={{
						headerShown: true,
						headerTransparent: true,
						headerTitle: '',
						headerLeft: ({ onPress }) => {
							const navigation = useNavigation();
							return (
								<TouchableOpacity
									style={{
										marginLeft: 15,
									}}
									onPress={() =>
										navigation.dispatch(StackActions.push('Landing'))
									}
								>
									<Ionicons name="arrow-back" size={26} color="black" />
								</TouchableOpacity>
							);
						},
					}}
					component={Camera}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
