module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(@testing-library/dom)/)"
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
  };
  