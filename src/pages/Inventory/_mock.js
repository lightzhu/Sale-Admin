import { parse } from 'url'
// mock tableListDataSource
let tableListDataSource = []

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    image: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'
    ][i % 2],
    name: `TradeCode ${i}`,
    title: `一个商品名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段商品描述',
    callNo: Math.floor(Math.random() * 1000),
    productNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    price: 112,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100)
  })
}

function getTableData(req, res, u) {
  let url = u

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url
  }

  const params = parse(url, true).query
  let dataSource = tableListDataSource

  if (params.sorter) {
    const s = params.sorter.split('_')
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]]
      }
      return prev[s[0]] - next[s[0]]
    })
  }

  if (params.status) {
    const status = params.status.split(',')
    let filterDataSource = []
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(item => {
          if (parseInt(`${item.status}`, 10) === parseInt(s.split('')[0], 10)) {
            return true
          }
          return false
        })
      )
    })
    dataSource = filterDataSource
  }

  if (params.name) {
    dataSource = dataSource.filter(data =>
      data.name.includes(params.name || '')
    )
  }

  let pageSize = 10

  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0)
  }

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1
  }
  return res.json(result)
}

function disableShop(req, res, u, b) {
  let url = u

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url
  }

  const { key } = req.query
  // console.log(key)
  let dataSource = tableListDataSource
  dataSource = dataSource.map(item => {
    if (item.key == key) {
      item.status = 0
    }
    return item
  })

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pagination: {
      total: dataSource.length
    }
  }
  return res.json(result)
}
function removeProduct(req, res, u, b) {
  let dataSource = tableListDataSource
  const { key } = req.query
  dataSource = dataSource.filter(item => {
    return item.key != key
  })
  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pagination: {
      total: dataSource.length
    }
  }
  return res.json(result)
}
export default {
  'GET /api/inventory': getTableData,
  'GET /api/disableShop': disableShop,
  'GET /api/removeProduct': removeProduct
}
