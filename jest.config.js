/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  moduleNameMapper: {
    '^rick_morty_host/characterStore$':
      '<rootDir>/__mocks__/rick_morty_host/characterStore.ts',

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },

  testMatch: [
    '<rootDir>/src/**/*.test.(ts|tsx)',
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
  ],

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
}
