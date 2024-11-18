export default {
  testEnvironment: "jest-environment-jsdom", // Ensure this is set correctly
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
