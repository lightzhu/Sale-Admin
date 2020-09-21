## 接口目录

| 接口描述         | 接口名                        |
| ---------------- | ----------------------------- |
| 登录接口         | [signIn](#signIn)             |
| 注册             | [register](#register)         |
| 获取当前用户信息 | [currentUser](#currentUser)   |
| 增加商品基本信息 | [basicInfo](#basicInfo)       |
| 增加更多商品信息 | [advanceInfo](#advanceInfo)   |
| 获取库存列表     | [inventory]                   |
| 停售商品         | [disableProduct]              |
| 移除商品         | [removeProduct]               |
| 获取订单列表     | [orderList](#orderList)       |
| 填写发货快递单号 | [setExpress](#setExpress)     |
| 删除订单信息     | [deleOrder](#deleOrder)       |
| 获取退款订单列表 | [refundList](#refundList)     |
| 同意退款         | [agreeRefund](#agreeRefund)   |
| 拒绝退款         | [refuseRefund](#refuseRefund) |

### 公共请求参数

| 参数名  | 变量名 | 类型 | 是否必须 | 备注                             |
| ------- | ------ | ---- | -------- | -------------------------------- |
| 用户 id | id     | int  | 否       | 有就使用，没有忽略，方便后台取参 |

### 公共响应参数

| 参数名 | 变量名 | 类型   | 是否必须 | 备注                                 |
| ------ | ------ | ------ | -------- | ------------------------------------ |
| 状态码 | status | String | 是       | 200:成功, 201:重新登录, 500:请求失败 |

## signIn

<span id="signIn">

## 登录接口： /login/signIn

### Method: POST

### Request

| 参数名 | 变量名   | 类型   | 是否必须 | 备注           |
| ------ | -------- | ------ | -------- | -------------- |
| 用户名 | email    | String | 是       | 123456@126.com |
| 密码   | password | String | 是       | 123456         |

### Response

---

| 参数名   | 变量名    | 类型    | 备注           |
| -------- | --------- | ------- | -------------- |
| 请求状态 | success   | boolean |                |
| 返回信息 | message   | String  |                |
| 返回数据 | data      | Object  | （#loginInfo） |
| 错误代码 | errorCode | int     |                |

<span id="loginInfo">
| 参数名       | 变量名   | 类型   | 是否必须 | 备注                   |
| ------------ | -------- | ------ | -------- | ---------------------- |
| 用户角色     | currentAuthority | String | 是 |  管理员：admin,用户：user ｜ 
| 用户ID     | userId | String | 是 |  用户唯一id ｜

## register

<span id="signUp">

## 注册接口： /login/register

### Method: Post

### Request

| 参数名         | 变量名   | 类型   | 是否必须 | 备注 |
| -------------- | -------- | ------ | -------- | ---- |
| 公司或者店铺   | company  | String | 是       |      |
| 电子邮箱       | email    | String | 是       |      |
| 用户名（昵称） | username | String | 是       |      |
| 密码           | password | String | 是       |      |
| 电话           | phone    | String | 否       | 选填 |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 返回数据 | data      | Object  | （#reg） |      |
| 错误代码 | errorCode | int     |          |      |

<span id="reg">
| 参数名       | 变量名   | 类型   | 是否必须 | 备注        |
| ------------| --------| ------| -------- | --------|
| 是否已注册    | isRegister| boolean| 是 |         ｜

<span id="currentUser">

## 获取当前用户信息： /user/currentUser

### Method: POST

### Request

| 参数名 | 变量名 | 类型 | 是否必须 | 备注 |
| ------ | ------ | ---- | -------- | ---- |
| 主键   | id     | int  | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注           |
| -------- | --------- | ------- | -------- | -------------- |
| 请求状态 | success   | boolean |          |                |
| 返回信息 | message   | String  |          |                |
| 返回数据 | data      | Object  |          | (#currentUser) |
| 错误代码 | errorCode | int     |          |                |

<span id="currentUser">

| 参数名       | 变量名   | 类型   | 是否必须 | 备注                   |
| ------------ | -------- | ------ | -------- | ---------------------- |
| 昵称         | name     | String | 是       |                        |
| 头像         | avatar   | String | 是       | 初始值可以设置一个默认 |
| 用户 id      | userid   | String | 是       | 创建成功后自动生成 id  |  |
| 邮箱         | email    | String | 是       |                        |
| 公司或者店铺 | company  | String | 是       |                        |
| 描述         | profile  | String |          |                        |
| 国家         | country  | String | 待定     |                        |
| 地址         | address  | String | 是       |                        |
| 账户         | account  | String | 是       | 银行卡号               |
| 电话         | phone    | String | 是       |                        |
| 密码         | password | String | 是       |                        |
| 加密的密码   | signpwd  | String | 是       |                        |

## 提交商品基础信息： /product/basicInfo

### Method: POST

### Request

| 参数名   | 变量名        | 类型   | 是否必须 | 备注 |
| -------- | ------------- | ------ | -------- | ---- |
| 商品名称 | name          | String | 是       |      |
| 副标题   | subTitle      | String | 是       |      |
| 主类目   | firstCategory | String | 是       |      |
| 二级类目 | secCategory   | String | 是       |      |
| 付款方式 | payType       | String | 是       |      |
| 商品描述 | describe      | String | 是       |      |
| 退货说明 | salesReturn   | String | 是       |      |
| 数量     | amount        | String | 否       | 选填 |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 返回数据 | data      | Object  |          |      |
| 错误代码 | errorCode | int     |          |      |

## 提交更多商品信息： /product/advanceInfo

### Method: POST

### Request

| 参数名     | 变量名 | 类型     | 是否必须 | 备注        |
| ---------- | ------ | -------- | -------- | ----------- |
| 提交的数据 | data   | FormData | 是       | (#FormData) |

<span id="FormData">
| 参数名       | 变量名   | 类型   | 是否必须 | 备注          |
| ------------ | -------- | ------ | -------- | --------- |
| 文件（商品图） | files[]  | files | 是       | files[]: [object Object]   |
| 变体列表      | variantion| Array | 是      |variantion: [object Object]  |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 返回数据 | data      | Object  |          |      |
| 错误代码 | errorCode | int     |          |      |

## 获取库存列表： /product/inventory

### Method: POST

### Request

| 参数名 | 变量名 | 类型 | 是否必须 | 备注 |
| ------ | ------ | ---- | -------- | ---- |
| 主键   | id     | int  | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注         |
| -------- | --------- | ------- | -------- | ------------ |
| 请求状态 | success   | boolean |          |              |
| 返回信息 | message   | String  |          |              |
| 返回数据 | data      | List    |          | (#inventory) |
| 总数     | total     | String  | Y        |              |
| 错误代码 | errorCode | int     |          |              |

<span id="inventory">

| 参数名 | 变量名 | 类型 | 是否必须 | 备注 |
| --- | --- | --- | --- | --- |
| 商品主键 | key | String | 是 |  |
| 商品链接 | href | String | 是 |  |  |
| 商品主图 | image | String | 是 |  |
| 商品名称 | title | String | 是 |  |
| 描述 | desc | String |  |  |
| 可售数量 | availableNo | int | 待定 |  |
| 已售数量 | saleNo | int | 是 |  |
| 上架数量 | productNo | int | 是 |  |
| 状态 | status | tring | 是 | 0 = '不可售'，1='销售中',2='不可售' |
| 价格 | price | int | 是 |  |
| 是否下架 | disabled | boolean | 是 |  |

## 停售商品： /product/disableProduct

### Method: GET

### Request

| 参数名  | 变量名 | 类型   | 是否必须 | 备注 |
| ------- | ------ | ------ | -------- | ---- |
| 商品 id | id     | String | Y        |      |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 错误代码 | errorCode | int     |          |      |

## 删除商品： /product/removeProduct

### Method: GET

### Request

| 参数名  | 变量名 | 类型   | 是否必须 | 备注 |
| ------- | ------ | ------ | -------- | ---- |
| 商品 id | id     | String | Y        |      |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 错误代码 | errorCode | int     |          |      |

## 获取库存列表： /order/order_list

### Method: GET

### Request

| 参数名  | 变量名 | 类型 | 是否必须 | 备注 |
| ------- | ------ | ---- | -------- | ---- |
| 用户 id | id     | int  | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注     |
| -------- | --------- | ------- | -------- | -------- |
| 请求状态 | success   | boolean |          |          |
| 返回信息 | message   | String  |          |          |
| 订单总数 | total     | int     |          |          |
| 返回数据 | data      | List    |          | (#order) |
| 错误代码 | errorCode | int     |          |          |

<span id="order">

| 参数名   | 变量名     | 类型   | 是否必须 | 备注    |
| -------- | ---------- | ------ | -------- | ------- |
| 商品 id  | id         | String | 是       |         |
| 商品链接 | href       | String | 是       |         |
| 商品主图 | avatar     | String | 是       |         |
| 商品名称 | title      | String | 是       |         |
| 订单编号 | orderNo    | String |          |         |
| 付款金额 | price      | String | 是       |         |
| 买家昵称 | user       | String | 是       |         |
| 购买数量 | number     | int    | 是       |         |
| 订单状态 | status     | String | 是       |         |
| 订单状态 | statusCode | String | 是       | 0，1，2 |
| 快递单号 | express    | String | 是       |         |

## 删除订单： /order/deleOrder

### Method: POST

### Request

| 参数名  | 变量名 | 类型 | 是否必须 | 备注 |
| ------- | ------ | ---- | -------- | ---- |
| 订单 id | id     | int  | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 返回数据 | data      | List    |          |      |
| 错误代码 | errorCode | int     |          |      |

## 填写发货快递单号： /order/setExpress

### Method: POST

### Request

| 参数名   | 变量名  | 类型   | 是否必须 | 备注 |
| -------- | ------- | ------ | -------- | ---- |
| 订单 id  | id      | int    | Y        | 1    |
| 快递单号 | express | string | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 返回数据 | data      | List    |          |      |
| 错误代码 | errorCode | int     |          |      |

## 获取退款订单列表： /order/refundList

### Method: GET

### Request

| 参数名     | 变量名   | 类型 | 是否必须 | 备注 |
| ---------- | -------- | ---- | -------- | ---- |
| 用户 id    | id       | int  | Y        | 1    |
| 页列表数量 | pageSize | int  | Y        | 1    |
| 页码数     | pageNum  | int  | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注      |
| -------- | --------- | ------- | -------- | --------- |
| 请求状态 | success   | boolean |          |           |
| 返回信息 | message   | String  |          |           |
| 订单总数 | total     | int     |          |           |
| 返回数据 | data      | List    |          | (#refund) |
| 错误代码 | errorCode | int     |          |           |

<span id="refund">

| 参数名      | 变量名      | 类型   | 是否必须 | 备注 |
| ----------- | ----------- | ------ | -------- | ---- |
| 退款订单 id | id          | String | 是       |      |
| 订单编号    | orderNo     | String |          |      |
| 商品链接    | href        | String | 是       |      |
| 商品名称    | title       | String | 是       |      |
| 退款金额    | pmoney      | String | 是       |      |
| 联系方式    | pconnect    | String | 是       |      |
| 买家昵称    | puser       | String | 是       |      |
| 退款原因    | preason     | String | 是       |      |
| 订单时间    | ptime       | String |          |      |
| 买家地址    | address     | String | 是       |      |
| 买家留言    | description | String | 是       |      |

## 同意退款： /order/agreeRefund

### Method: POST

### Request

| 参数名  | 变量名 | 类型 | 是否必须 | 备注 |
| ------- | ------ | ---- | -------- | ---- |
| 订单 id | id     | int  | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 返回数据 | data      | Object  |          |      |
| 错误代码 | errorCode | int     |          |      |

## 拒绝退款： /order/refuseRefund

### Method: GET

### Request

| 参数名  | 变量名 | 类型 | 是否必须 | 备注 |
| ------- | ------ | ---- | -------- | ---- |
| 订单 id | id     | int  | Y        | 1    |

### Response

| 参数名   | 变量名    | 类型    | 是否必须 | 备注 |
| -------- | --------- | ------- | -------- | ---- |
| 请求状态 | success   | boolean |          |      |
| 返回信息 | message   | String  |          |      |
| 返回数据 | data      | Object  |          |      |
| 错误代码 | errorCode | int     |          |      |
