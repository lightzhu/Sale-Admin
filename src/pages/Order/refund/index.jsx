import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Divider } from 'antd'
import Search from './searchbar'
class Refund extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.columns = [
      { title: '退货用户', dataIndex: 'puser', key: 'puser', align: 'center' },
      { title: '订单编号', dataIndex: 'pcode', key: 'pcode', align: 'center' },
      {
        title: 'Product',
        dataIndex: 'ptitle',
        key: 'ptitle',
        align: 'center',
        width: 350,
      },
      {
        title: '退款金额',
        dataIndex: 'pmoney',
        key: 'pmoney',
        align: 'center',
        width: 100,
        render: (text) => <span>$ {text}</span>,
      },
      {
        title: '联系方式',
        dataIndex: 'pconnect',
        key: 'pconnect',
        width: 220,
        align: 'center',
      },
      {
        title: '退货原因',
        dataIndex: 'preason',
        key: 'preason',
        width: 100,
        align: 'center',
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        width: 220,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a>同意退货</a>
              <Divider type='vertical' />
              <a className='ant-dropdown-link'>拒绝退货</a>
              <Divider type='vertical' />
              <a className='ant-dropdown-link'>delete</a>
            </span>
          )
        },
      },
    ]
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager_current = pagination.current
    // console.log(pager_current)
    const { dispatch } = this.props
    dispatch({
      type: 'order/fetchRefundList',
      payload: {
        pageSize: 20,
        pageNum: pager_current,
      },
    })
  }
  search(value) {
    console.log(value)
    const { dispatch } = this.props
    dispatch({
      type: 'order/fetchRefundCondition',
      payload: value,
    })
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'order/fetchRefundList',
      payload: {
        pageSize: 20,
        pageNum: 1,
      },
    })
  }
  render() {
    const { refund, totalSize, loading } = this.props
    console.log(refund)
    // const { data } = this.state
    return (
      <div>
        <Search search={this.search.bind(this)} />
        <Table
          columns={this.columns}
          loading={loading}
          bordered
          pagination={{
            total: totalSize,
          }}
          expandedRowRender={(record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          )}
          dataSource={refund}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}
export default connect(({ order, loading }) => ({
  refund: order.refund,
  totalSize: order.totalSize,
  loading: loading.models.order,
}))(Refund)
