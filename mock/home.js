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
    bills: [
      { name: 'today', val: 10 },
      { name: 'week', val: 90 },
      { name: '15 days', val: 190 },
      { name: 'month', val: 390 }
    ]
  }
}
