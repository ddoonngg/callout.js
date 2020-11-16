module.exports = {
  roots: ['<rootDir>/__tests__'],
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.|\\.(test|spec))\\.(ts|tsx|js)$',
  coverageDirectory: '<rootDir>'
};
