// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add 3D model file extensions to asset extensions
config.resolver.assetExts.push(
  'glb',
  'gltf',
  'obj',
  'mtl',
  'bin'
);

module.exports = config;
