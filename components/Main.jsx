import { View, Text } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro/components/AR/ViroARSceneNavigator';

import ModelList from './ModelList';
import ARManager from '../AR';
import ActionButton from './ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { animateModel, removeModel } from '../redux/appSlice';

const Main = ({ navigation }) => {
	const dispatch = useDispatch();
	const model = useSelector((s) => s.app.modelItems);

	return (
		<View style={{ flex: 1 }}>
			<ViroARSceneNavigator
				autofocus={true}
				initialScene={{
					scene: ARManager,
				}}
			/>
			<ModelList />
			<ActionButton
				icon="camera"
				onPress={() => navigation.navigate('Camera')}
			/>
			{model?.name && (
				<>
					<ActionButton
						icon="delete"
						right
						onPress={() => dispatch(removeModel())}
					/>
					<ActionButton
						icon="animate"
						right
						containerStyle={{ bottom: 160 }}
						onPress={() => dispatch(animateModel())}
					/>
				</>
			)}
		</View>
	);
};

export default Main;
