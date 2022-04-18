import { defineConfig } from 'umi';

let publicPath = '/dapp/';

export default defineConfig({
  base: publicPath,
  publicPath: publicPath,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
