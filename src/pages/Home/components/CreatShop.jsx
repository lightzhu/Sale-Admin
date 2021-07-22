import { Button, Input, Modal, Radio, Cascader, Select, Row, Col, Form } from 'antd'
import React, { Component } from 'react'
import { connect } from 'dva'
import { creatShop, updateShopInfo } from '@/services/shop'
import { getGoodCategory } from '@/services/category'
import { address } from '@/assets/js/address'
const { Option } = Select
class CreatShop extends Component {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {}
  }
  formLayout = {
    labelCol: {
      span: 7
    },
    wrapperCol: {
      span: 17
    }
  }
  formLayout2 = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
      categoryList: []
    }
  }
  handleCreate = () => {
    const { form, updateShops, isShopEdit, shopInfo } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const formVals = { ...fieldsValue }
      console.log(formVals)
      if (isShopEdit) {
        updateShopInfo({ id: shopInfo.id, ...formVals }).then((res) => {
          if (res.status == 1) {
            updateShops()
          }
        })
      } else {
        creatShop(formVals).then((info) => {
          console.log(info)
          if (info.status == 1) {
            updateShops()
          }
        })
      }
    })
  }
  handleCategoryChange = () => {}
  renderContent = (formVals, categoryList) => {
    const { form } = this.props
    const { getFieldDecorator } = form
    // 基本信息的模版
    return [
      <Col span={12} key="name">
        <Form.Item {...this.formLayout} label="店铺名称">
          {getFieldDecorator('name', {
            initialValue: formVals.name,
            rules: [
              {
                required: true,
                message: '请输入店铺名称'
              }
            ]
          })(<Input placeholder="请输入店铺名称" />)}
        </Form.Item>
      </Col>,
      <Col span={12} key="category">
        <Form.Item {...this.formLayout} label="店铺类别">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please select your gender!' }],
            initialValue: formVals.category
          })(
            <Select placeholder="请选择类别" onChange={this.handleCategoryChange}>
              {categoryList.length
                ? categoryList.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })
                : null}
            </Select>
          )}
        </Form.Item>
      </Col>,
      <Col span={12} key="phone">
        <Form.Item {...this.formLayout} label="手机号">
          {getFieldDecorator('phone', {
            initialValue: formVals.phone,
            rules: [
              {
                required: true,
                message: '请输入手机号'
              }
            ]
          })(<Input type="number" placeholder="请输入手机号" />)}
        </Form.Item>
      </Col>,
      <Col span={12} key="address">
        <Form.Item {...this.formLayout} label="地址">
          {getFieldDecorator('address', {
            initialValue: formVals.address,
            rules: [{ type: 'array', required: true, message: '请选择地址!' }]
          })(<Cascader options={address} />)}
        </Form.Item>
      </Col>,
      <Col span={24} key="description">
        <Form.Item {...this.formLayout2} label="店铺描述">
          {getFieldDecorator('description', {
            initialValue: formVals.description,
            rules: [
              {
                required: true,
                message: '请输入店铺描述'
              }
            ]
          })(<Input.TextArea rows={4} placeholder="请输入店铺描述" />)}
        </Form.Item>
      </Col>
    ]
  }

  renderFooter = () => {
    const { isShopEdit, handleCancel } = this.props
    return [
      <Button key="cancel" onClick={() => handleCancel(false)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={this.handleCreate}>
        {isShopEdit ? '确认修改' : '确认新增'}
      </Button>
    ]
  }
  componentDidMount() {
    // 获取商店类别
    getGoodCategory({ id: 0 }).then((list) => {
      if (list.length) {
        this.setState({ categoryList: list })
      }
    })
  }
  render() {
    const { creatShopVisible, handleCancel, isShopEdit } = this.props
    const { shopInfo, admin } = this.props
    const { categoryList } = this.state
    return (
      <Modal
        width={660}
        bodyStyle={{
          padding: '30px 40px 30px'
        }}
        destroyOnClose
        title={isShopEdit ? '修改店铺' : '新增店铺'}
        visible={creatShopVisible}
        footer={this.renderFooter()}
        onCancel={() => handleCancel(false)}
      >
        <Form className="add-shop-form">
          <Row gutter={24}>{this.renderContent(shopInfo, categoryList)}</Row>
        </Form>
      </Modal>
    )
  }
}

export default connect(({ shop, user }) => ({
  shopInfo: shop.shopInfo,
  admin: user.currentUser
}))(Form.create()(CreatShop))
