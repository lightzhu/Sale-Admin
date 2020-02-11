export default {
  // 支持值为 Object 和 Array
  'GET /api/homeSum': {
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
  'GET /api/homeBills': {
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
  'GET /api/getRepertory': {
    code: '200',
    ProductList: [
      {
        product:
          "Victoria's Secret Fantasies Gift Set 2 Piece Fragrance Mist Lotion 2.5 Oz Vs New",
        amount: '7',
        specification: '红色8,蓝色9,黑色10',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/ob4AAOSwePpeJTNH/s-l200.jpg'
      },
      {
        product:
          "Victoria's Secret Fantasies Gift Set 2 Piece Fragrance Mist Lotion 2.5 Oz Vs New",
        amount: '7',
        specification: '红色8,蓝色9,黑色10',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/ob4AAOSwePpeJTNH/s-l200.jpg'
      },
      {
        product:
          '2020手链女士珠宝首饰珠子手链魅力脉轮手链爱情女孩手链不锈钢蝴蝶',
        amount: '57',
        specification: '红色18,蓝色19,黑色20',
        proImg:
          'https://img.ejiayou.com/uploadPic/Image/2018/05/1526454027877.jpg'
      },
      {
        product:
          "Victoria's Secret Fantasies Gift Set 2 Piece Fragrance Mist Lotion 2.5 Oz Vs New",
        amount: '4',
        specification: '红色XL 1,蓝色XXL 2,粉色 L 1',
        proImg:
          'https://i.ebayimg.com/thumbs/images/g/ob4AAOSwePpeJTNH/s-l200.jpg'
      }
    ]
  }
}
