// @ts-check

import { baseConfig } from './lib/base';
import { jsxConfig } from './lib/jsx';
import { tsConfig } from './lib/ts';

const defaultConfig = [baseConfig, jsxConfig, tsConfig];

export { defaultConfig as default, baseConfig, jsxConfig, tsConfig };
