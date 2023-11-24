// vite.config.ts
import { ConfigEnv, UserConfig, defineConfig } from 'vite';

import { createConfig } from './scripts';

export default defineConfig((params: ConfigEnv): UserConfig => {
    const config = createConfig(params);
    return config;
});
