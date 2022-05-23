import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modelItems: {},
	animation: false,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		addModel: (state, action) => {
			state.modelItems = action.payload.model;
		},
		removeModel: (state, _action) => {
			state.modelItems = undefined;
		},
		animateModel: (state, _action) => {
			state.animation = !state.animation;
		},
	},
});

export const { addModel, removeModel, animateModel } = appSlice.actions;
export default appSlice.reducer;
