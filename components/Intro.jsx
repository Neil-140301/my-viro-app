import styled from 'styled-components/native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const Intro = ({ navigation }) => {
	return (
		<Container>
			<Box>
				<Logo source={require('../assets/ar.gif')} />
			</Box>
			<View
				style={{
					// backgroundColor: 'green',
					width: '100%',
					height: 200,
					alignItems: 'center',
					paddingVertical: 15,
				}}
			>
				<EnterBtn
					style={{ elevation: 1 }}
					onPress={() => navigation.navigate('Camera')}
				>
					<Text>Enter</Text>
					<AntDesign name="rightcircle" size={26} color="black" />
				</EnterBtn>
			</View>
		</Container>
	);
};

export default Intro;

//styles

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #fff;
`;

const Box = styled.View`
	height: 500px;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const Logo = styled.Image`
	width: 100%;
	height: 100%;
`;

const EnterBtn = styled.TouchableOpacity`
	background-color: white;
	padding: 15px 28px;
	border-radius: 5px;
	flex-direction: row;
	align-items: center;
`;

const Text = styled.Text`
	font-size: 26px;
	font-weight: bold;
	letter-spacing: 1.5px;
	text-align: center;
	margin-right: 15px;
`;
