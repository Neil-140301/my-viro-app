import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { getModelArray } from '../models';
import ListItem from './ListItem';

const models = getModelArray();

const ModelList = () => {
	const model = useSelector((s) => s.app.modelItems);

	return (
		<Container>
			<FlatList
				data={models}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(i) => `ar-model-${i.name}`}
				renderItem={({ item, index }) => {
					return (
						<ListItem
							selected={item?.name === model?.name}
							all={model?.name === undefined}
							model={item}
						/>
					);
				}}
			/>
		</Container>
	);
};

export default ModelList;

//styles
const Container = styled.View`
	width: 100%;
	height: 85px;
	position: absolute;
	justify-content: center;
	align-items: center;
	bottom: 0;
	background-color: #000000aa;
	z-index: 50;
	flex: 1;
`;
