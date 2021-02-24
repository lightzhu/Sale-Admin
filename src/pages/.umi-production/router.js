import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/admin/Documents/React/Sale-Admin/src/pages/.umi-production/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        name: 'register',
        path: '/user/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__register" */ '../user/register'),
              LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                .default,
            })
          : require('../user/register').default,
        exact: true,
      },
      {
        name: 'regresult',
        path: '/user/regresult',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__RegResult" */ '../user/RegResult'),
              LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                .default,
            })
          : require('../user/RegResult').default,
        exact: true,
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__AppMian" */ '../../layouts/AppMian'),
          LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/AppMian').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__Layout" */ '../../layouts/Layout'),
              LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/Layout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/home',
            exact: true,
          },
          {
            name: 'home',
            icon: 'home',
            path: '/home',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Home" */ '../Home'),
                  LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../Home').default,
            exact: true,
          },
          {
            name: 'dashboard',
            icon: 'desktop',
            path: '/dashboard',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Dashboard" */ '../Dashboard'),
                  LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../Dashboard').default,
            exact: true,
          },
          {
            name: 'order',
            icon: 'bars',
            path: '/order',
            routes: [
              {
                name: 'order_list',
                icon: 'user',
                path: '/order/orderList',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Order__model.js' */ '/Users/admin/Documents/React/Sale-Admin/src/pages/Order/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__Layout" */ '../Order'),
                      LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Order').default,
                exact: true,
              },
              {
                name: 'refund_list',
                icon: 'solution',
                path: '/order/refundList',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Order__model.js' */ '/Users/admin/Documents/React/Sale-Admin/src/pages/Order/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__Layout" */ '../Order/refund'),
                      LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Order/refund').default,
                exact: true,
              },
            ],
          },
          {
            name: 'commodity',
            icon: 'shop',
            path: '/commodity',
            routes: [
              {
                name: 'inventory',
                icon: 'table',
                path: '/commodity/inventory',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__Layout" */ '../Inventory'),
                      LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Inventory').default,
                exact: true,
              },
              {
                path: '/commodity/commodityAdd',
                name: 'commodity_add',
                icon: 'file-done',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__Layout" */ '../Commodity'),
                      LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Commodity').default,
                exact: true,
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
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__Layout" */ '../Account'),
                      LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account').default,
                exact: true,
              },
              {
                name: 'user_list',
                icon: 'solution',
                path: '/account/userList',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__Layout" */ '../Account/user'),
                      LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/user').default,
                exact: true,
              },
            ],
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Welcome" */ '../Welcome'),
                  LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../Welcome').default,
            authority: ['admin'],
            exact: true,
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Admin" */ '../Admin'),
                  LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../Admin').default,
            authority: ['admin'],
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
