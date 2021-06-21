import Mock from 'mockjs';

export default {
  'POST /shop/getShopById': (req, res) => {
    // console.log(req)
    res.send({
      status: 200,
      data: {
        id: 1,
        merchantId: 1,
        name: "测试店铺",
        shopDesc: "一家专门做特卖的店铺"
      },
      message: "ok"
    })
  },
  'POST /shop/getShopsByOwner': (req, res) => {
    res.send({
      status: 200,
      message: "ok",
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
  'POST /shop/setShop': (req, res) => {
    res.send({
      status: 200,
      isRegister: true
    })
  },
  'POST /shop/creatShop': (req, res) => {
    let body = req.body
    res.send({
      status: 200,
      new: { ...body },
      message: 'ok'
    })
  }
}
