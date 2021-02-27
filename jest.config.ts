export default {
  bail: true,
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/__tests__/*.test.ts'],
};
