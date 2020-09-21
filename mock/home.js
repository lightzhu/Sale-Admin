export default {
  // 支持值为 Object 和 Array
  'GET /home/homeSum': {
    code: '200',
    sumMoney: [
      { name: 'today', val: 90 },
      { name: 'week', val: 290 },
      { name: '15 days', val: 490 },
      { name: 'month', val: 990 }
    ],
    sumBills: [
      { name: 'today', val: 10 },
      { name: 'week', val: 90 },
      { name: '15 days', val: 190 },
      { name: 'month', val: 390 }
    ]
  },
  'GET /home/homeBills': {
    code: '200',
    BillList: [
      {
        customer: 'mark hh',
        product:
          '2020手链女士珠宝首饰珠子手链魅力脉轮手链爱情女孩手链不锈钢蝴蝶',
        amount: '3',
        payment: '27',
        status: '已付款',
        statusNo: '1',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/8e4AAOSwIrBbarSF/s-l225.webp'
      },
      {
        customer: 'Tim hh',
        product:
          '2020手链女士珠宝首饰珠子手链魅力脉轮手链爱情女孩手链不锈钢蝴蝶',
        amount: '5',
        payment: '27',
        status: '已付款',
        statusNo: '1',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/8e4AAOSwIrBbarSF/s-l225.webp'
      },
      {
        customer: 'Tom hh',
        product:
          '2020手链女士珠宝首饰珠子手链魅力脉轮手链爱情女孩手链不锈钢蝴蝶',
        amount: '6',
        payment: '87',
        status: '已发货',
        statusNo: '2',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/8e4AAOSwIrBbarSF/s-l225.webp'
      },
      {
        customer: 'mark ss',
        product:
          '2020手链女士珠宝首饰珠子手链魅力脉轮手链爱情女孩手链不锈钢蝴蝶',
        amount: '3',
        payment: '27',
        statusNo: '3',
        status: '已完成',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/8e4AAOSwIrBbarSF/s-l225.webp'
      }
    ]
  },
  'GET /home/getRepertory': {
    code: '200',
    ProductList: [
      {
        product:
          "Victoria's Secret Fantasies Gift Set 2 Piece Fragrance Mist Lotion 2.5 Oz Vs New",
        amount: '7',
        specification: '红色8,蓝色9,黑色10',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/ob4AAOSwePpeJTNH/s-l200.jpg',
        imageList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/-IUAAOSwRiNdNn98/s-l300.jpg'
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/WdIAAOSws6ldEv4k/s-l64.jpg'
          },
          {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/XOQAAOSwTh1drkkh/s-l225.jpg'
          },
          {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/M0IAAOSwz5peVTbR/s-l225.jpg'
          }
        ]
      },
      {
        product:
          "Victoria's Secret Fantasies Gift Set 2 Piece Fragrance Mist Lotion 2.5 Oz Vs New",
        amount: '7',
        specification: '红色8,蓝色9,黑色10',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/ob4AAOSwePpeJTNH/s-l200.jpg',
        imageList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/-IUAAOSwRiNdNn98/s-l300.jpg'
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/WdIAAOSws6ldEv4k/s-l64.jpg'
          },
          {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/XOQAAOSwTh1drkkh/s-l225.jpg'
          },
          {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/M0IAAOSwz5peVTbR/s-l225.jpg'
          }
        ]
      },
      {
        product:
          '2020手链女士珠宝首饰珠子手链魅力脉轮手链爱情女孩手链不锈钢蝴蝶',
        amount: '57',
        specification: '红色18,蓝色19,黑色20',
        proImg:
          'https://img.ejiayou.com/uploadPic/Image/2018/05/1526454027877.jpg',
        imageList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/-IUAAOSwRiNdNn98/s-l300.jpg'
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/WdIAAOSws6ldEv4k/s-l64.jpg'
          },
          {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/XOQAAOSwTh1drkkh/s-l225.jpg'
          },
          {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/M0IAAOSwz5peVTbR/s-l225.jpg'
          }
        ]
      },
      {
        product:
          "Victoria's Secret Fantasies Gift Set 2 Piece Fragrance Mist Lotion 2.5 Oz Vs New",
        amount: '4',
        specification: '红色XL 1,蓝色XXL 2,粉色 L 1',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/ob4AAOSwePpeJTNH/s-l200.jpg',
        imageList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/-IUAAOSwRiNdNn98/s-l300.jpg'
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/WdIAAOSws6ldEv4k/s-l64.jpg'
          },
          {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/XOQAAOSwTh1drkkh/s-l225.jpg'
          },
          {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url:
              'https://i.ebayimg.com/images/g/M0IAAOSwz5peVTbR/s-l225.jpg'
          }
        ]
      }
    ]
  }
}
