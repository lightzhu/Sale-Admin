import { Button, DatePicker, Input, Modal, Radio, Select, Form } from 'antd'
import React, { Component } from 'react'
import { connect } from 'dva'
import { updateBasicInfo } from '@/services'
import { creatShop, updateShopInfo } from '@/services/shop'
const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select
const RadioGroup = Radio.Group

class CreatShop extends Component {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  }

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  }
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
    }
  }
  handleCreat = () => {
    const { form, updateShops, handleCreatVisible, isShopEdit } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const formVals = { ...fieldsValue }
      let params = Object.assign(fieldsValue, {
        id: localStorage.getItem('id'),
      })
      console.log(isShopEdit)
      if (isShopEdit) {
        creatShop(params).then((info) => {
          console.log(info)
          if (info.message == 'OK') {
            updateShops()
            handleCreatVisible(false)
          }
        })
      } else {
        updateShopInfo(formVals).then((res) => {
          if (res.message == 'OK') {
            updateShops()
            handleCreatVisible(false)
          }
        })
      }
    })
  }
  renderContent = (formVals) => {
    const { form } = this.props
    const { getFieldDecorator } = form
    // 基本信息的模版
    return [
      <Form.Item key='name' {...this.formLayout} label='店铺名称'>
        {getFieldDecorator('name', {
          initialValue: formVals.name,
          rules: [
            {
              required: true,
              message: '请输入店铺名称',
            },
          ],
        })(<Input placeholder='请输入店铺名称' />)}
      </Form.Item>,
      <Form.Item
        key='id'
        {...this.formLayout}
        label='店铺名称'
        style={{
          display: 'none',
        }}>
        {getFieldDecorator('id', {
          initialValue: formVals.id,
        })(<Input placeholder='' />)}
      </Form.Item>,
      <Form.Item key='merchantId' {...this.formLayout} label='用户ID'>
        {getFieldDecorator('merchantId', {
          initialValue: formVals.merchantId,
          rules: [
            {
              required: true,
              message: '请输入用户ID',
            },
          ],
        })(<Input type='number' disabled placeholder='请输入用户ID' />)}
      </Form.Item>,
      <Form.Item key='shopDesc' {...this.formLayout} label='店铺描述'>
        {getFieldDecorator('shopDesc', {
          initialValue: formVals.shopDesc,
          rules: [
            {
              required: true,
              message: '请输入店铺描述',
            },
          ],
        })(<Input.TextArea rows={4} placeholder='请输入店铺描述' />)}
      </Form.Item>,
    ]
  }

  renderFooter = () => {
    const { isShopEdit } = this.props
    const { handleCreatVisible, values } = this.props
    return [
      <Button key='cancel' onClick={() => handleCreatVisible(false)}>
        取消
      </Button>,
      <Button key='forward' type='primary' onClick={this.handleCreat}>
        {isShopEdit ? '确认新增' : '确认修改'}
      </Button>,
    ]
  }

  render() {
    const { creatShopVisible, handleCreatVisible } = this.props
    const { shopInfo } = this.props
    return (
      <Modal
        width={660}
        bodyStyle={{
          padding: '32px 40px 48px',
        }}
        destroyOnClose
        title='库存基本信息编辑'
        visible={creatShopVisible}
        footer={this.renderFooter()}
        onCancel={() => handleCreatVisible(false)}>
        {this.renderContent(shopInfo)}
      </Modal>
    )
  }
}

export default connect(({ shop }) => ({
  shopInfo: shop.shopInfo,
}))(Form.create()(CreatShop))
