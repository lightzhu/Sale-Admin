import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  history: 'hash',
  base: '/', //sale-admin/
  publicPath: '/',//sale-admin/
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'register',
          path: '/user/register',
          component: './user/register',
        },
        {
          name: 'regresult',
          path: '/user/regresult',
          component: './user/RegResult',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/AppMian',
      routes: [
        {
          path: '/',
          component: '../layouts/Layout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/home',
            },
            {
              name: 'home',
              icon: 'home',
              path: '/home',
              component: './Home',
            },
            {
              name: 'dashboard',
              icon: 'desktop',
              path: '/dashboard',
              component: './Dashboard',
            },
            {
              name: 'order',
              icon: 'bars',
              path: '/order',
              // component: './Order',
              routes: [
                {
                  name: 'order_list',
                  icon: 'user',
                  path: '/order/orderList',
                  component: './Order',
                },
                {
                  name: 'refund_list',
                  icon: 'solution',
                  path: '/order/refundList',
                  component: './Order/refund',
                },
              ],
            },
            {
              name: 'commodity',
              icon: 'shop',
              path: '/commodity',
              // component: './Commodity',
              // redirect: '/commodity/inventory',
              routes: [
                {
                  name: 'inventory',
                  icon: 'table',
                  path: '/commodity/inventory',
                  component: './Inventory',
                },
                {
                  path: '/commodity/commodityAdd',
                  name: 'commodity_add',
                  icon: 'file-done',
                  component: './Commodity',
                },
              ],
            },
            {
              name: 'account',
              icon: 'team',
              path: '/account',
              routes: [
                {
                  name: 'mine',
                  icon: 'user',
                  path: '/account/mine',
                  component: './Account',
                },
                {
                  name: 'user_list',
                  icon: 'solution',
                  path: '/account/userList',
                  component: './Account/user',
                },
              ],
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
              authority: ['admin']
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/', // chainWebpack: webpackPlugin,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8099',
      // target: 'https://api.2048888.xyz',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  }
};
