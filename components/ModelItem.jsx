import { ViroNode } from '@viro-community/react-viro/components/ViroNode';
import { ViroMaterials } from '@viro-community/react-viro/components/Material/ViroMaterials';
import { Viro3DObject } from '@viro-community/react-viro/components/Viro3DObject';
import { useCallback, useRef, useState } from 'react';
import { LOADED, LOADING, LOAD_ERROR } from '../models';
import { useSelector } from 'react-redux';

ViroMaterials.createMaterials({
	pbr: {
		lightingModel: 'PBR',
	},
});

const ModelItem = ({ model }) => {
	const arNodeRef = useRef();
	const animation = useSelector((s) => s.app.animation);

	const [state, setState] = useState({
		scale: model.scale,
		rotation: [0, 0, 0],
		nodeIsVisible: false,
		position: model.position,
		shouldBillboard: true,
		runAnimation: false,
		itemClickedDown: false,
	});

	const onItemClicked = useCallback(() => {
		let currentAnimationState = state.runAnimation;
		setState((p) => ({
			...p,
			runAnimation: !currentAnimationState,
			itemClickedDown: false,
		}));
	}, [state]);

	const onClickState = useCallback(
		(uuid) => {
			return (clickState, position, source) => {
				if (clickState === 1) {
					setState((p) => ({ ...p, itemClickedDown: true }));
					setTimeout(() => {
						setState((p) => ({ ...p, itemClickedDown: false }));
					}, 200);
				}

				if (clickState === 2) {
					if (state.itemClickedDown) {
						onItemClicked();
					}

					// onClickStateCallback(
					// 	uuid,
					// 	clickState,
					// 	UIConstants.LIST_MODE_MODEL
					// ); read from props
				}
			};
		},
		[state, onItemClicked]
	);

	const onPinch = useCallback(
		(pinchState, scaleFactor, source) => {
			const newScale = state.scale.map((x) => x * scaleFactor);

			if (pinchState === 3) {
				setState((p) => ({ ...p, scale: newScale }));
				// props.onClickStateCallback(
				// 	this.props.modelIDProps.uuid,
				// 	pinchState,
				// 	UIConstants.LIST_MODE_MODEL
				// );
				return;
			}

			arNodeRef.current.setNativeProps({ scale: newScale });
			// //this.spotLight.setNativeProps({shadowFarZ: 6 * newScale[0]});
		},
		[state]
	);

	const updateInitialRotation = useCallback(() => {
		arNodeRef.current.getTransformAsync().then((retDict) => {
			let rotation = retDict.rotation;
			let absX = Math.abs(rotation[0]);
			let absZ = Math.abs(rotation[2]);

			let yRotation = rotation[1];

			// if the X and Z aren't 0, then adjust the y rotation.
			if (absX > 1 && absZ > 1) {
				yRotation = 180 - yRotation;
			}
			setState((p) => ({
				...p,
				rotation: [0, yRotation, 0],
				shouldBillboard: false,
				nodeIsVisible: true,
			}));
		});
	}, []);

	const setInitialPlacement = useCallback(
		(position) => {
			setState((p) => ({ ...p, position: position }));
			setTimeout(() => {
				updateInitialRotation();
			}, 500);
		},
		[updateInitialRotation]
	);

	const onARHitTestResults = useCallback(
		(position, forward, results) => {
			// default position is just 3 forward of the user
			let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];

			// try to find a more informed position via the hit test results
			if (results.length > 0) {
				let hitResultPosition = undefined;
				// Go through all the hit test results, and find the first AR Point that's close to the position returned by the AR Hit Test
				// We'll place our object at that first point
				for (var i = 0; i < results.length; i++) {
					let result = results[i];
					if (
						result.type === 'ExistingPlaneUsingExtent' ||
						(result.type === 'FeaturePoint' && !hitResultPosition)
					) {
						// Calculate distance of the "position" from this hit test result
						// math = Sqr root {(x1-x2)^2 + (y1-y2)^2 + (z1-z2)^2} ->regular "distance" calculation
						var distance = Math.sqrt(
							(result.transform.position[0] - position[0]) *
								(result.transform.position[0] - position[0]) +
								(result.transform.position[1] - position[1]) *
									(result.transform.position[1] - position[1]) +
								(result.transform.position[2] - position[2]) *
									(result.transform.position[2] - position[2])
						);
						if (distance > 0.2 && distance < 10) {
							hitResultPosition = result.transform.position;
							break;
						}
					}
				}

				// If we found a hitResultPosition above after doing the distance math, set the position to this new place
				if (hitResultPosition) {
					newPosition = hitResultPosition;
				}
			}

			setInitialPlacement(newPosition);
		},
		[setInitialPlacement]
	);

	const onObjectLoadEnd = useCallback(
		(uuid) => {
			return () => {
				this.props.onLoadCallback(uuid, LOADED);
				this.props.hitTestMethod(onARHitTestResults);
			};
		},
		[onARHitTestResults]
	);

	const onObjectLoadStart = useCallback((uuid) => {
		return () => {
			// this.props.onLoadCallback(uuid, LOADING);
		};
	}, []);

	const onError = useCallback((uuid) => {
		return () => {
			// this.props.loadCallback(uuid, LOAD_ERROR);
			//this.props.arSceneNavigator.viroAppProps.loadingObjectCallback(index, LoadingConstants.LOAD_ERROR);
		};
	}, []);

	const moveObject = useCallback((newPosition) => {
		setState((p) => ({ ...p, position: newPosition }));
	}, []);

	const rotateObject = useCallback(
		(rotateState, rotationFactor, _source) => {
			if (rotateState === 3) {
				const newRotation = state.rotation.map((i) => i - rotationFactor);
				setState((p) => ({ ...p, rotation: newRotation }));
			}
		},
		[state]
	);

	return (
		// <ViroNode
		// 	key={model.name}
		// 	ref={arNodeRef}
		// 	// visible={state.visible}
		// 	position={model.position}
		// 	scale={model.scale}
		// 	rotation={state.rotation}
		// 	onDrag={() => {}}
		// 	dragType="FixedToWorld"
		// >
		// {/* <ViroNode position={model.position}> */}
		<Viro3DObject
			ref={arNodeRef}
			source={model.obj}
			type={model.type}
			materials={'pbr'}
			// position={model.position}
			position={state.position}
			scale={state.scale}
			rotation={state.rotation}
			resources={model.resources}
			animation={{ ...model.animation, run: animation }}
			lightReceivingBitMask={1}
			// onClickState={onClickState(this.props.modelIDProps.uuid)}
			onClick={() => {}}
			// onError={onError(this.props.modelIDProps.uuid)}
			// onRotate={onRotate}
			onPinch={onPinch}
			onDrag={moveObject}

			// onLoadStart={onObjectLoadStart(this.props.modelIDProps.uuid)}
			// onLoadEnd={onObjectLoadEnd(this.props.modelIDProps.uuid)}
		/>
		// {/* </ViroNode> */}
		// </ViroNode>
	);
};

export default ModelItem;
8;
