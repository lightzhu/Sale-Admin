import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'commodity', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/commodity.js').default) });
app.model({ namespace: 'dashboard', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/dashboard.js').default) });
app.model({ namespace: 'global', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/global.js').default) });
app.model({ namespace: 'home', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/home.js').default) });
app.model({ namespace: 'login', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/setting.js').default) });
app.model({ namespace: 'shop', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/shop.js').default) });
app.model({ namespace: 'user', ...(require('/Users/admin/Documents/React/Sale-Admin/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
