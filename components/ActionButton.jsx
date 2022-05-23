import styled from 'styled-components/native';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import {
	FontAwesome,
	MaterialCommunityIcons,
	MaterialIcons,
} from 'expo-vector-icons';

const ActionButton = ({ containerStyle, icon, right, onPress }) => {
	const Icon = useCallback(() => {
		switch (icon) {
			case 'camera':
				return <FontAwesome name="camera" size={22} color="white" />;
			case 'delete':
				return <MaterialIcons name="delete" size={22} color="white" />;
			case 'animate':
				return (
					<MaterialCommunityIcons name="animation" size={22} color="white" />
				);
			default:
				break;
		}
	}, [icon]);

	const position = right ? { right: 10 } : { left: 10 };

	return (
		<Container style={[position, containerStyle]}>
			<TouchableOpacity onPress={onPress}>
				<Icon />
			</TouchableOpacity>
		</Container>
	);
};

export default ActionButton;

//styles
const Container = styled.View`
	position: absolute;
	justify-content: center;
	align-items: center;
	bottom: 100px;
	z-index: 50;
	flex: 1;
	background-color: rgba(255, 255, 255, 0.4);
	padding: 12px;
	border-radius: 50px;
`;
