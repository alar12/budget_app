module.exports = {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'jsdom', // or 'node' based on your setup
    // other configurations if necessary
  };