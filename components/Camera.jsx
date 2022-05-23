import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Camera as ExpoCamera } from 'expo-camera';
import { decode } from 'base64-arraybuffer';
// import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { FontAwesome } from 'expo-vector-icons';

const Camera = ({ navigation }) => {
	const [photo, setPhoto] = useState(null);
	const [open, setOpen] = useState(true);
	const [loading, setLoading] = useState(false);
	const cameraRef = useRef();

	const getPhotoInfo = async (photo) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				// `https://vision-ar-app.cognitiveservices.azure.com/vision/v3.2/describe`,
				`https://vision-ar-app.cognitiveservices.azure.com/vision/v3.2/detect`,
				photo,
				{
					headers: {
						'Content-Type': 'application/octet-stream',
						'Ocp-Apim-Subscription-Key': '42d12d14886e42a2a42ebacacd1de121',
					},
				}
			);

			console.log(data);
			setLoading(false);

			const item = data?.objects.find((i) => i.confidence >= 0.577);

			if (item) {
				speak('This object is called ' + item.object);
			} else {
				speak("sorry couldn't find object");
			}
		} catch (error) {
			console.error(error?.message);
		}
	};

	const snap = async () => {
		try {
			const pic = await cameraRef?.current.takePictureAsync({ base64: true });
			setPhoto(pic.base64);
			setOpen(false);

			let bin = decode(pic.base64);
			getPhotoInfo(bin);
		} catch (error) {
			console.log(error);
		}
	};

	const speak = async (text) => {
		Speech.speak(text);
	};

	return (
		<Container open={open}>
			{!open ? (
				<>
					<Image
						source={{ uri: `data:image/jpg;base64,${photo}` }}
						style={[StyleSheet.absoluteFillObject]}
					/>
					<SnapBtn onPress={() => setOpen(true)}>
						{loading ? (
							<Label>Analyzing...</Label>
						) : (
							<>
								<FontAwesome name="repeat" size={24} color="black" />
								<Label>Retake</Label>
							</>
						)}
					</SnapBtn>
				</>
			) : (
				<ExpoCamera
					style={{
						flex: 1,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}
					type={ExpoCamera.Constants.Type.back}
					ratio="16:9"
					ref={cameraRef}
				>
					<SnapBtn onPress={snap}>
						<FontAwesome name="camera" size={22} color="black" />
						<Label>Snap</Label>
					</SnapBtn>
				</ExpoCamera>
			)}
		</Container>
	);
};

export default Camera;

//styles
const Container = styled.View`
	justify-content: flex-end;
	align-items: center;
	flex: 1;
	padding: ${(p) => (p.open ? 0 : 15)}px;
`;

const SnapBtn = styled.TouchableOpacity`
	border-radius: 10px;
	padding: 15px 28px;
	background-color: #fff;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 15px;
`;

const Label = styled.Text`
	font-size: 16px;
	letter-spacing: 1.5px;
	font-weight: bold;
	margin-left: 10px;
`;
