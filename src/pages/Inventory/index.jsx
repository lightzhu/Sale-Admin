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
      key: selectedRows.map((row) => row.key),
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
    checkValue: 0, // 0:全部  1:在售  2:不可售
  }
  async handleUpdate() {
    this.handleUpdateModalVisible(false)
    const hide = message.loading('正在更新')
    try {
      await this.initPage()
      hide()
      message.success('更新成功')
      return true
    } catch (error) {
      hide()
      message.error('更新失败请重试！')
      return false
    }
  }
  handleUpdateModalVisible(boolean) {
    this.setState({
      updateModalVisible: boolean,
    })
  }
  setStepFormValues(row) {
    console.log(row)
    this.setState({
      stepFormValues: row,
    })
  }
  updateRowStatus(data) {
    this.setState({
      tableData: data.data,
    })
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      checkValue: e.target.value,
    })
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
        checkShop: e.target.value,
      },
      () => {
        this.initPage()
      }
    )
  }
  initPage() {
    const { userId } = this.props
    queryTable({
      shopId: this.state.checkShop,
      page: this.state.page,
      size: 20,
    }).then((resp) => {
      console.log(resp)
      if (resp.data) {
        let arr = resp.data.map((item, index) => {
          return { ...item, key: item.id }
        })
        this.setState({
          tableData: arr,
        })
      }
    })
  }
  componentDidMount() {
    const { shopsList } = this.props
    // 初始化店铺
    this.setState({ checkShop: shopsList[0].id }, () => {
      // 获取店铺商品
      this.initPage()
    })
  }
  render() {
    const { stepFormValues, updateModalVisible } = this.state
    return (
      <>
        <div className={styles.checkbox}>
          <div>
            <span className={styles.label}>商品状态:</span>
            <Radio.Group onChange={this.onChange} value={this.state.checkValue}>
              <Radio value={0}>全部</Radio>
              <Radio value={1}>在售</Radio>
              <Radio value={2}>不可售</Radio>
            </Radio.Group>
          </div>
          <div>
            <span className={styles.label}>店铺选择:</span>
            <Radio.Group
              onChange={this.shopChange}
              value={this.state.checkShop}>
              <Radio value={0}>全部</Radio>
              {this.creatShopList()}
            </Radio.Group>
          </div>
        </div>

        <SaTable
          tableData={this.state.tableData}
          updateModalVisible={this.handleUpdateModalVisible.bind(this)}
          setStepFormValues={this.setStepFormValues.bind(this)}
          updateRowStatus={this.updateRowStatus.bind(this)}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={this.handleUpdate.bind(this)}
            onCancel={() => {
              this.handleUpdateModalVisible(false)
              this.setStepFormValues({})
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </>
    )
  }
}

export default connect(({ user, shop }) => ({
  userId: user.currentUser.id,
  shopsList: shop.shopsList,
}))(Form.create()(TableList))
