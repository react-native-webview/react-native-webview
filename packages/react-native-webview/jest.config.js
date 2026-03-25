module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(\\.bun/.*/)?(react-native|@react-native(-community)?)/)',
  ],
};
