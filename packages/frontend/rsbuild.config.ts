import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';

import { defineConfig } from '@rsbuild/core';
export default  defineConfig({
    source: {
        entry: {
            index: './src/index.tsx'
        },
        tsconfigPath: './tsconfig.json',
    },
    server: {
        port: 4321
    },
    output: {
        target: 'web',
        distPath: {
            root: 'dist',
        },
    },
    plugins: [
      pluginBabel({
        include: /\.(?:jsx|tsx)$/,
      }),
      pluginSolid(),
    ],
});
