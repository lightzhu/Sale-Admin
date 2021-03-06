import Mock from 'mockjs';
const titles = [
  '华为 mate 30 Pro 5g 麒麟 990 智能手机 6.53" 双 SIM 4 真正的相机',
  'ZOSI Wireless CCTV 1080P NVR Kit HD WiFi IP Camera Home Security System Outdoor',
  'Oakley 银色 XL 太阳镜 oo9341-0157 哑光黑色 | 灰色偏光镜片',
  '装饰 Gear 35" 曲面 ULTRAWIDE LED 游戏显示器清晰的 2560x1080 高清',
  'Hot Thermo Sweat Body Shaper Slimming Waist Trainer Cincher Yoga Gym Top Vest'
]
const avatars = [
  'https://i.ebayimg.com/images/g/BG0AAOSwyR1d~vXw/s-l225.jpg',
  'https://i.ebayimg.com/images/g/EVkAAOSw9IReTK5c/s-l225.jpg',
  'https://i.ebayimg.com/images/g/-r8AAOSw-IheOW9f/s-l225.jpgg',
  'https://i.ebayimg.com/images/g/tkIAAOSwdtRdhAZG/s-l225.jpg',
  'https://i.ebayimg.com/images/g/xygAAOSwd5xcYwEb/s-l225.jpg'
]
const price = [
  '7,380.85',
  '1,354.72',
  '428.61',
  '2,174.90',
  '38.66'
]
const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼'
]

function orderList(count) {
  const list = []
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `order-list-${i}`,
      user: user[i % 10],
      title: titles[i % 5],
      avatar: avatars[i % 5],
      price: price[i % 5],
      orderNo: '2393450201934095',
      status: ['待发货', '进行中', '已完成'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      href: 'https://web.2048888.xyz/',
      updatedAt: new Date(
        new Date().getTime() - 1000 * 60 * 60 * 2 * i
      ).getTime(),
      createdAt: new Date(
        new Date().getTime() - 1000 * 60 * 60 * 2 * i
      ).getTime(),
      members: [
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1'
        },
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2'
        },
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3'
        }
      ]
    })
  }

  return list
}

let sourceData = []

function getOrderList(req, res) {
  const params = req.query
  const count = params.count * 1 || 20
  const result = orderList(count)
  sourceData = result
  return res.json({
    status: '200',
    message: "ok",
    data: result
  })
}

function postFakeList(req, res) {
  const {
    /* url = '', */
    body
  } = req // const params = getUrlParams(url);

  const { method, id } = body // const count = (params.count * 1) || 20;
  let result = sourceData || []
  debugger
  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id)
      break
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = { ...item, ...body }
        }
      })
      break
    case 'post':
      result.unshift({
        ...body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime()
      })
      break
    default:
      break
  }
  return res.json({
    status: '200',
    message: "ok",
    data: result
  })
}
const fakeRefundList = Mock.mock({
  total: 100,
  message: "ok",
  status: 200,
  'data|10': [
    {
      id: '@id',
      key: '@guid(1000)',
      ptitle: '@sentence(10, 20)',
      pcode: '@natural(10000000)',
      puser: '@name',
      pconnect: '@email',
      "preason|1": [
        "不想要了",
        "买多了",
        "无法使用"
      ],
      pmoney: '@integer(1, 1000)',
      phone_number: '@natural(10000)',
      address: '@county(true)',
      ptime: '@datetime',
      description: `买家留言:${'@word(5,20)'}`
    }
  ]
})
const fakeRefundCondition = Mock.mock({
  message: "ok",
  status: 200,
  'data|5': [
    {
      id: '@id',
      key: '@guid(1000)',
      ptitle: '@sentence(10, 20)',
      pcode: '@natural(10000000)',
      puser: '@name',
      pconnect: '@email',
      "preason|1": [
        "不想要了",
        "买多了",
        "无法使用"
      ],
      pmoney: '@integer(1, 1000)',
      phone_number: '@natural(10000)',
      address: '@county(true)',
      ptime: '@datetime',
      description: `买家留言:${'@word(5,20)'}`
    }
  ],
  total: 5
})
export default {
  'GET /order/order_list': getOrderList,
  'POST /order/dele_order': (req, res) => {
    res.send({
      status: '200',
      message: "ok"
    })
  },
  'POST  /order/set_express': (req, res) => {
    res.send({
      status: '200',
      message: "ok"
    })
  },
  'POST  /order/fake_list': postFakeList,
  'GET  /order/refund_list': fakeRefundList,
  'GET  /order/refund_list_condition': fakeRefundCondition
}
