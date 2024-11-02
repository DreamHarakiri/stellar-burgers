import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@pages': '<rootDir>/src/pages',
    '^@components': '<rootDir>/src/components',
    '^@ui': '<rootDir>/src/components/ui',
    '^@ui-pages': '<rootDir>/src/components/ui/pages',
    '^@utils-types': '<rootDir>/src/utils/types',
    '^@api': '<rootDir>/src/utils/burger-api.ts',
    '^@slices': '<rootDir>/src/services/slices',
    '^@selectors': '<rootDir>/src/services/slices'
  }
};

export default config;
