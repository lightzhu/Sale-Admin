export default {
  'POST /product/basicInfo': (_, res) => {
    res.send({
      status: '200',
      message: 'ok'
    })
  },
  'POST /product/advanceInfo': (_, res) => {
    res.send({
      message: 'ok',
      status: '200',
    })
  }
}
