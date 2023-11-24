// scripts/index.ts
import { ConfigEnv, UserConfig } from 'vite';
import merge from 'deepmerge';

import { Configure } from './types';
import { pathResolve } from './utils';
import { createPlugins } from './plugins';

export const createConfig = (params: ConfigEnv, configure?: Configure): UserConfig => {
    const isBuild = params.command === 'build';
    return merge<UserConfig>(
        {
            resolve: {
                alias: {
                    '@': pathResolve('src'),
                },
            },
            css: {
                modules: {
                    localsConvention: 'camelCaseOnly',
                },
            },
            server: {
                // 指定dev sever的端口号，默认为5173
                port: 5174,
            },
            plugins: createPlugins(isBuild),
        },
        typeof configure === 'function' ? configure(params, isBuild) : {},
        {
            arrayMerge: (_d, s, _o) => Array.from(new Set([..._d, ...s])),
        },
    );
};
