import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    collectCoverage: true,
};

export default config;