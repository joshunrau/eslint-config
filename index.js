// @ts-check

import { baseConfig } from './lib/base.js';
import { jsxConfig } from './lib/jsx.js';
import { tsConfig } from './lib/ts.js';

const defaultConfig = [baseConfig, jsxConfig, tsConfig];

export { defaultConfig as default, baseConfig, jsxConfig, tsConfig };
