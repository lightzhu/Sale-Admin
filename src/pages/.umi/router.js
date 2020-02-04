import React from "react";
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter
} from "react-router-dom";
import dynamic from "umi/dynamic";
import renderRoutes from "umi/lib/renderRoutes";
import history from "@@/history";
import RendererWrapper0 from "/Users/admin/Documents/React/Sale-Admin/src/pages/.umi/LocaleWrapper.jsx";
import { routerRedux, dynamic as _dvaDynamic } from "dva";

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: "/user",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__UserLayout" */ "../../layouts/UserLayout"
            ),
          LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/UserLayout").default,
    routes: [
      {
        name: "login",
        path: "/user/login",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(
                  /* webpackChunkName: "p__user__login" */ "../user/login"
                ),
              LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
                .default
            })
          : require("../user/login").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/admin/Documents/React/Sale-Admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    path: "/",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__SecurityLayout" */ "../../layouts/SecurityLayout"
            ),
          LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/SecurityLayout").default,
    routes: [
      {
        path: "/",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(
                  /* webpackChunkName: "layouts__BasicLayout" */ "../../layouts/BasicLayout"
                ),
              LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
                .default
            })
          : require("../../layouts/BasicLayout").default,
        authority: ["admin", "user"],
        routes: [
          {
            path: "/",
            redirect: "/welcome",
            exact: true
          },
          {
            path: "/welcome",
            name: "welcome",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Welcome" */ "../Welcome"),
                  LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
                    .default
                })
              : require("../Welcome").default,
            exact: true
          },
          {
            path: "/admin",
            name: "admin",
            icon: "crown",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Admin" */ "../Admin"),
                  LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
                    .default
                })
              : require("../Admin").default,
            authority: ["admin"],
            exact: true
          },
          {
            name: "list.table-list",
            icon: "table",
            path: "/list",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__ListTableList" */ "../ListTableList"
                    ),
                  LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
                    .default
                })
              : require("../ListTableList").default,
            exact: true
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ "../404"),
                  LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
                    .default
                })
              : require("../404").default,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/admin/Documents/React/Sale-Admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ "../404"),
              LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
                .default
            })
          : require("../404").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/admin/Documents/React/Sale-Admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ "../404"),
          LoadingComponent: require("/Users/admin/Documents/React/Sale-Admin/src/components/PageLoading/index")
            .default
        })
      : require("../404").default,
    exact: true
  },
  {
    component: () =>
      React.createElement(
        require("/Users/admin/Documents/React/Sale-Admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
          .default,
        { pagesPath: "src/pages", hasRoutesInConfig: true }
      )
  }
];
window.g_routes = routes;
const plugins = require("umi/_runtimePlugin");
plugins.applyForEach("patchRoutes", { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach("onRouteChange", {
        initialValue: {
          routes,
          location,
          action
        }
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf("callback(history.location, history.action)") > -1;
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
