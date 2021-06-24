import { Button, Input, Modal, Radio, Cascader, Select, Row, Col, Form } from 'antd'
import React, { Component } from 'react'
import { connect } from 'dva'
import { creatShop, updateShopInfo } from '@/services/shop'
import { adress } from '@/assets/js/adress'
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
      addForm: {
        name: '',
        adress: ['浙江', '杭州', '西湖'],
        phone: '',
        category: '手机',
        description: ''
      }
    }
  }
  handleCreat = () => {
    const { form, updateShops, handleCreatVisible, isShopEdit } = this.props
    form.validateFields((err, fieldsValue) => {
      debugger
      if (err) return
      const formVals = { ...fieldsValue }
      console.log(formVals)
      if (isShopEdit) {
        updateShopInfo(formVals).then((res) => {
          if (res.message == 'ok') {
            updateShops()
            handleCreatVisible(false)
          }
        })
      } else {
        creatShop(params).then((info) => {
          console.log(info)
          if (info.message == 'ok') {
            // updateShops()
            handleCreatVisible(false)
          }
        })
      }
    })
  }
  handleCategoryChange = () => {}
  renderContent = (formVals, admin) => {
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
              <Option value="1">居家</Option>
              <Option value="2">百货</Option>
              <Option value="3">日用</Option>
              <Option value="4">手机</Option>
              <Option value="5">电脑</Option>
              <Option value="6">服饰</Option>
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
      <Col span={12} key="adress">
        <Form.Item {...this.formLayout} label="地址">
          {getFieldDecorator('adress', {
            initialValue: formVals.adress,
            rules: [{ type: 'array', required: true, message: '请选择地址!' }]
          })(<Cascader options={adress} />)}
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
    const { isShopEdit } = this.props
    const { handleCreatVisible, values } = this.props
    return [
      <Button key="cancel" onClick={() => handleCreatVisible(false)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={this.handleCreat}>
        {isShopEdit ? '确认新增' : '确认修改'}
      </Button>
    ]
  }

  render() {
    const { creatShopVisible, handleCreatVisible, isShopEdit } = this.props
    const { shopInfo, admin } = this.props
    const { addForm } = this.state
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
        onCancel={() => handleCreatVisible(false)}
      >
        <Form className="add-shop-form">
          <Row gutter={24}>{this.renderContent(addForm)}</Row>
        </Form>
      </Modal>
    )
  }
}

export default connect(({ shop, user }) => ({
  shopInfo: shop.shopInfo,
  admin: user.currentUser
}))(Form.create()(CreatShop))
