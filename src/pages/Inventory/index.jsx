import { Button, Divider, Radio, message, Form } from 'antd'
import React from 'react'
import { connect } from 'dva'
import UpdateForm from './components/UpdateForm'
import SaTable from './components/SaTable'
import { queryTable, updateRule, addRule, removeRule } from './service'
import styles from './index.less'
// 当前模块不使用redux管理
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除')
  if (!selectedRows) return true

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key)
    })
    hide()
    message.success('删除成功，即将刷新')
    return true
  } catch (error) {
    hide()
    message.error('删除失败，请重试')
    return false
  }
}

class TableList extends React.Component {
  state = {
    updateModalVisible: false,
    stepFormValues: {},
    tableData: [],
    page: 1,
    status: 0, // 0:全部  1:在售  2:不可售
    checkShop: 0,
    pageSize: 20,
    count: 10,
    pageLoading: true
  }
  async handleUpdate() {
    this.handleUpdateModalVisible(false)
    try {
      await this.initPage()
      message.success('更新成功')
      return true
    } catch (error) {
      message.error('更新失败请重试！')
      return false
    }
  }
  handleUpdateModalVisible(boolean) {
    this.setState({
      updateModalVisible: boolean
    })
  }
  setStepFormValues(row) {
    console.log(row)
    this.setState({
      stepFormValues: row
    })
    this.props.dispatch({
      type: 'commodity/saveVariantion',
      payload: row.spec_goods
    })
    this.props.dispatch({
      type: 'commodity/saveFileList',
      payload: row.image_list.map((item, key) => {
        return {
          uid: key,
          status: 'done',
          url: item
        }
      })
    })
  }
  updateRowStatus(data) {
    let list = this.state.tableData
    let key = list.findIndex((spot) => spot._id == data._id)
    list.splice(key, 1, data)
    this.setState({
      tableData: list
    })
  }
  handleDeleRowItem(data) {
    let list = this.state.tableData
    let key = list.findIndex((spot) => spot._id == data._id)
    list.splice(key, 1)
    this.setState({
      tableData: list
    })
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value)
    this.setState(
      {
        status: e.target.value
      },
      () => {
        this.initPage()
      }
    )
  }
  creatShopList = () => {
    const { shopsList } = this.props
    return shopsList.map((item, index) => {
      return (
        <Radio value={item.id} key={index}>
          {item.name}
        </Radio>
      )
    })
  }
  shopChange = (e) => {
    this.setState(
      {
        checkShop: e.target.value
      },
      () => {
        this.initPage()
      }
    )
  }
  initPage() {
    this.setState({
      pageLoading: true
    })
    queryTable({
      shopId: this.state.checkShop,
      page: this.state.page,
      size: 15,
      status: this.state.status
    })
      .then((resp) => {
        console.log(resp)
        if (resp.data) {
          let arr = resp.data.map((item, index) => {
            return { ...item, key: item.id }
          })
          this.setState({
            tableData: arr,
            count: resp.count,
            pageLoading: false
          })
        }
      })
      .catch((e) => {
        this.setState({
          pageLoading: false
        })
      })
  }
  pageChange = (val) => {
    console.log(val)
    this.setState(
      {
        page: val
      },
      () => {
        this.initPage()
      }
    )
  }
  componentDidMount() {
    const { shopsList, dispatch } = this.props
    if (dispatch && shopsList.length == 0) {
      dispatch({
        type: 'shop/fetchShops',
        payload: { id: window.sessionStorage.getItem('id') }
      })
    }
    // 获取店铺商品
    this.initPage()
  }
  render() {
    const { stepFormValues, updateModalVisible, pageSize, page, count } = this.state
    return (
      <>
        <div className={styles.checkbox}>
          <div>
            <span className={styles.label}>商品状态:</span>
            <Radio.Group onChange={this.onChange} value={this.state.status}>
              <Radio value={0}>全部</Radio>
              <Radio value={1}>在售</Radio>
              <Radio value={2}>不可售</Radio>
            </Radio.Group>
          </div>
          <div>
            <span className={styles.label}>店铺选择:</span>
            <Radio.Group onChange={this.shopChange} value={this.state.checkShop}>
              <Radio value={0}>全部</Radio>
              {this.creatShopList()}
            </Radio.Group>
          </div>
        </div>

        <SaTable
          tableData={this.state.tableData}
          loading={this.props.loading || this.state.pageLoading}
          pagination={{ pageSize: pageSize, current: page, total: count, onChange: this.pageChange }}
          updateModalVisible={this.handleUpdateModalVisible.bind(this)}
          setStepFormValues={this.setStepFormValues.bind(this)}
          updateRowStatus={this.updateRowStatus.bind(this)}
          deleRowItem={this.handleDeleRowItem.bind(this)}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={this.handleUpdate.bind(this)}
            onCancel={() => {
              this.handleUpdateModalVisible(false)
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
            variantion={this.props.variantion}
          />
        ) : null}
      </>
    )
  }
}

export default connect(({ user, shop, commodity, loading }) => ({
  userId: user.currentUser.id,
  shopsList: shop.shopsList,
  loading: loading.effects['commodity/saveFileList'],
  variantion: commodity.variantion
}))(Form.create()(TableList))
