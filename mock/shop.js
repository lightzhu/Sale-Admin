import Mock from 'mockjs';

export default {
  'POST /shop/getShopById': (req, res) => {
    console.log(req)
    res.send({
      status: 200,
      data: {
        id: 1,
        merchantId: 1,
        name: "测试店铺",
        shopDesc: "一家专门做特卖的店铺"
      },
      message: "OK"
    })
  },
  'POST /shop/getShopListById': (req, res) => {
    console.log(req)
    res.send({
      status: 200,
      message: "OK",
      data: [
        {
          id: 5,
          gmtCreate: null,
          merchantId: 47,
          name: "卖手机的店",
          shopDesc: "卖手机的店,华为荣耀",
          gmtModify: "2020-05-21T10:33:16.000+0000"
        }, {
          id: 6,
          merchantId: 47,
          name: "衣服铺",
          shopDesc: "专注卖衣服",
          gmtCreate: "2020-05-21T09:05:22.000+0000",
          gmtModify: "2020-05-21T09:05:22.000+0000"
        }, {
          id: 7,
          merchantId: 47,
          name: "桂云",
          shopDesc: "测试电风扇",
          gmtCreate: null,
          gmtModify: "2020-05-21T10:34:00.000+0000"
        }
      ]
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
  'POST /v1/shop/setShop': (req, res) => {
    console.log(req)
    res.send({
      status: 200,
      isRegister: true
    })
  }
}
