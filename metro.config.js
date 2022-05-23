// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push(
	...[
		'obj',
		'mtl',
		'JPG',
		'vrx',
		'hdr',
		'gltf',
		'glb',
		'bin',
		'arobject',
		'png',
		'jpg',
	]
);

defaultConfig.resolver.extraNodeModules = require('node-libs-react-native');

defaultConfig.transformer = {
	getTransformOptions: async () => ({
		transform: {
			experimentalImportSupport: false,
			inlineRequires: false,
		},
	}),
};

module.exports = defaultConfig;
