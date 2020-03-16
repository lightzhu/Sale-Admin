import city from './geographic/city.json';
import province from './geographic/province.json';
import Mock from 'mockjs';
function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx')
} // 代码中会兼容本地 service mock 以及部署站点的静态数据
function getProvince(req, res) {
  console.log(0)
  return res.json(province);
}

function getCity(req, res) {
  return res.json(city[req.params.province]);
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Sale-Admin',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    company: '华为手机专卖店',
    profile: '特价手机专卖，批发价，处理价。',
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000'
      },
      city: {
        label: '杭州市',
        key: '330100'
      }
    },
    account: '62228 7666 3738 44089',
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
    password: '123456',
    signpwd: 'afdc6789aeec90'
  },
  'POST /api/modCurrentUser': (req, res) => {
    res.send({
      status: 'ok',
      msg: 'mod is ok'
    })
  },
  // GET POST 可省略
  'GET /api/users': Mock.mock({
    'data|100': [
      {
        key: '@guid(100)',
        id: '@id(10000)',
        title: '@sentence(1, 4)',
        company: '@name',
        email: '@email',
        name: '@name',
        phone_number: '@natural(10000000000, 19999999999)',
        address: '@county(true)',
        reigster_time: '@datetime'
      }
    ]
  }),
  'POST /api/login/account': (req, res) => {
    const { password, username, type } = req.body
    console.log(password, username, type + '>>0')
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      })
      return
    }

    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user'
      })
      return
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest'
    })
  },
  'GET /api/province': getProvince,
  'GET /api/city/:province': getCity,
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user'
    })
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list'
    })
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212'
    })
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list'
    })
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list'
    })
  },
  'GET  /api/login/captcha': getFakeCaptcha
}
