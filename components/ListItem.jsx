import { Animated } from 'react-native';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { addModel } from '../redux/appSlice';

const ListItem = ({ model, selected, all }) => {
	const dispatch = useDispatch();

	const addNewModel = useCallback(() => {
		dispatch(addModel({ model }));
	}, [dispatch, model]);

	return (
		<Container onPress={addNewModel}>
			<MImage selected={selected} all={all} source={model.icon_img} />
		</Container>
	);
};

export default ListItem;

//styles

const Container = styled.TouchableOpacity`
	justify-content: center;
	margin: 0 4px;
`;

const MImage = styled(Animated.Image)`
	width: 60px;
	height: 60px;
	border-radius: 40px;
	border: ${(p) => (p.selected ? '1px solid white' : 'none')};
	opacity: ${(p) => (p.all ? 1 : p.selected ? 1 : 0.5)};
`;
