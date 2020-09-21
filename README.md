# 基于 Ant Design 和 umi 的 react 电商后台管理平台

This project is initialized with [Ant Design Pro](https://pro.ant.design).

一个简单的电商商品管理后台。

## 发不到 github page

修改 config,添加

```
  history: { type: 'hash' }, // 使用hash模式，默认是browser
  base: '/Sale-Admin/', // 指定跟路径
  publicPath: '/Sale-Admin/', // 指定公共静态资源目录
  // 参考更多：https://pro.ant.design/docs/deploy-cn
```

## 前端展示

[特卖商城后台管理] http://www.2048888.xyz/Sale-Admin/

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.7.0/image/react/sale-mall1.png" height="320" width="568" >
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.7.0/image/react/sale-mall2.png" height="320" width="568" >
</div>

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.7.0/image/react/sale-mall3.png" height="320" width="568" >
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.7.0/image/react/sale-mall4.png" height="320" width="568" >
</div>

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.7.0/image/react/sale-mall5.png" height="320" width="568" >
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.7.0/image/react/sale-mall6.png" height="320" width="568" >
</div>

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

- dva 的 connect 方法中使用到了 dva-loading，会自动在 reducers 中的 state 新增了 loading 对象，
- 请求前：global 为 false，effects 和 models 为空对象 laoding: { effects: {} global: false models: {} }
- 请求中： global 为 true； effects 的 key 为 dispatch 的 type 值，value 为 true； models 的 key 为 namespace 值，value 为 true
- loading： { effects: {users/user/fetch: true} global: true models: {users: true} }
- 请求完成： global 为 false； effects 的 key 为 dispatch 的 type 值，value 为 false； models 的 key 为 namespace 值，value false；

- loading： { effects: {users/user/fetch: false} global: false models: {users: false} }
