module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(\\.bun/.*/)?(react-native|@react-native(-community)?)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/windows/'],
};
