export default {
  'POST  /product/basicInfo': (_, res) => {
    res.send({
      status: '200',
      message: 'Ok'
    })
  },
  'POST  /product/advanceInfo': (_, res) => {
    res.send({
      message: 'Ok',
      status: '200',
    })
  }
}
