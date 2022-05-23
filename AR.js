import { ViroARScene } from '@viro-community/react-viro/components/AR/ViroARScene';
import { ViroAmbientLight } from '@viro-community/react-viro/components/ViroAmbientLight';
import { ViroDirectionalLight } from '@viro-community/react-viro/components/ViroDirectionalLight';
import { ViroSpotLight } from '@viro-community/react-viro/components/ViroSpotLight';

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import ModelItem from './components/ModelItem';

const ARManager = () => {
	const model = useSelector((s) => s.app.modelItems);
	const arsceneRef = useRef();

	const performARHitTest = (callback) => {
		arsceneRef.current.getCameraOrientationAsync().then((orientation) => {
			arsceneRef.current
				.performARHitTestWithRay(orientation.forward)
				.then((results) => {
					callback(orientation.position, orientation.forward, results);
				});
		});
	};

	console.log(model);

	return (
		<ViroARScene ref={arsceneRef}>
			<ViroAmbientLight color="#ffffff" intensity={20} />

			{/* DirectionalLight with the direction away from the user, pointed upwards, to light up the "face" of the model */}
			<ViroDirectionalLight color="#ffffff" direction={[0, -1, -0.2]} />

			{/* Spotlight on top of the model to highlight this model*/}
			<ViroSpotLight
				innerAngle={5}
				outerAngle={90}
				direction={[0, 1, 0]}
				position={[0, -7, 0]}
				color="#ffffff"
				intensity={250}
			/>

			{/* {Object.keys(models).map((key) => (
				<ModelItem
					key={key}
					model={models[key]}
					hitTestMethod={performARHitTest}
					// onLoadCallback={onLoadCallback}
					// onClickStateCallback={onModelsClickStateCallback}
				/>
			))} */}
			{model?.name && (
				<ModelItem
					model={model}
					hitTestMethod={performARHitTest}
					// onLoadCallback={onLoadCallback}
					// onClickStateCallback={onModelsClickStateCallback}
				/>
			)}
		</ViroARScene>
	);
};

export default ARManager;
