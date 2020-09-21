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
  'POST /user/currentUser': {
    message: 'ok',
    status: 200,
    data: {
      id: 47,
      active: true,
      name: 'SaleAdmin',
      nickname: "卖手机的",
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      email: '957969881@qq.com',
      company: '华为手机专卖店',
      gender: null,
      profile: '特价手机专卖，批发价，处理价。',
      countryId: '86',
      cityId: '330100',
      idCard: null,
      isAdmin: false,
      account: '62228 7666 3738 44089',
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
      password: "82ug05b311fs6kb56afa3vqsbr5tnfnf",
      signpwd: 'afdc6789aeec90',
      phone: null,
      gmtCreate: "2020-05-21T08:32:09.000+0000",
      gmtModify: "2020-06-02T10:06:20.000+0000"
    }
  },
  'POST /user/updateMerchant': (req, res) => {
    res.send({
      status: '200',
      message: 'ok'
    })
  },
  // GET POST 可省略
  'GET /user/users': Mock.mock({
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
  'POST /login/signIn': (req, res) => {
    const { password, username } = req.body
    console.log(password, username)
    if (password && username == 'admin') {
      return res.send({
        status: 200,
        data: {
          currentAuthority: 'admin',
          token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lU3RhbXAiO",
          id: 1
        },
        message: "ok"
      })
    } else {
      return res.send({
        status: 200,
        data: {
          currentAuthority: 'user',
          token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lU3RhbXAiO",
          id: 1
        },
        message: "ok"
      })
    }
  },
  'POST /login/register': (req, res) => {
    res.send({
      status: '200',
      message: 'ok',
      isRegister: true
    })
  },
  'GET /user/province': getProvince,
  'GET /user/city/:province': getCity,
  'GET /500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list'
    })
  },
  'GET /404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212'
    })
  },
  'GET /403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list'
    })
  },
  'GET /401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list'
    })
  },
  'GET  /login/captcha': getFakeCaptcha
}
