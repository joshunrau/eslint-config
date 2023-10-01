import path from 'path';
import url from 'url';

import { createConfig } from './dist/index.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default createConfig({
  base: {
    env: 'node'
  },
  ts: {
    project: path.resolve(__dirname, 'tsconfig.json')
  }
});
