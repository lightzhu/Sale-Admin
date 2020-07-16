import { Button, DatePicker, Input, Modal, Radio, Select, Form } from 'antd'
import React, { Component } from 'react'
import { updateBasicInfo } from '@/services'
const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select
const RadioGroup = Radio.Group

class UpdateForm extends Component {
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
      formVals: props.values,
      currentStep: 0,
    }
  }
  handleUpdate = () => {
    const { form, onSubmit } = this.props
    // const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const formVals = { ...fieldsValue }
      console.log(formVals)
      let params = Object.assign(this.state.formVals, formVals)
      updateBasicInfo(params).then((info) => {
        console.log(info)
        if (info.message == 'OK') {
          onSubmit()
        }
      })
    })
  }
  renderContent = (currentStep, formVals) => {
    const { form } = this.props
    const { getFieldDecorator } = form
    console.log(formVals)
    // 编辑商品图片
    if (currentStep === 1) {
      return [
        <FormItem key='target' {...this.formLayout} label='监控对象'>
          {form.getFieldDecorator('target', {
            initialValue: formVals.target,
          })(
            <Select
              style={{
                width: '100%',
              }}>
              <Option value='0'>表一</Option>
              <Option value='1'>表二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key='template' {...this.formLayout} label='规则模板'>
          {form.getFieldDecorator('template', {
            initialValue: formVals.template,
          })(
            <Select
              style={{
                width: '100%',
              }}>
              <Option value='0'>规则模板一</Option>
              <Option value='1'>规则模板二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key='type' {...this.formLayout} label='规则类型'>
          {form.getFieldDecorator('type', {
            initialValue: formVals.type,
          })(
            <RadioGroup>
              <Radio value='0'>强</Radio>
              <Radio value='1'>弱</Radio>
            </RadioGroup>
          )}
        </FormItem>,
      ]
    }
    // 基本信息的模版
    return [
      <Form.Item key='name' {...this.formLayout} label='商品名称'>
        {getFieldDecorator('name', {
          initialValue: formVals.name,
          rules: [
            {
              required: true,
              message: '请输入商品名称',
            },
          ],
        })(<Input placeholder='请输入商品名称' />)}
      </Form.Item>,
      <Form.Item key='price' {...this.formLayout} label='单价'>
        {getFieldDecorator('price', {
          initialValue: formVals.price,
          rules: [
            {
              required: true,
              message: '请输入单价',
            },
          ],
        })(<Input type='number' placeholder='请输入单价' />)}
      </Form.Item>,
      <Form.Item key='payWay' {...this.formLayout} label='付款方式'>
        {getFieldDecorator('payWay', {
          initialValue: '支付宝',
          rules: [
            {
              required: true,
              message: '请选择付款方式',
            },
          ],
        })(
          <Select style={{ width: '100%' }} placeholder='付款方式'>
            <Option value='1'>支付宝</Option>
            <Option value='2'>银行账户</Option>
          </Select>
        )}
      </Form.Item>,
      <Form.Item key='amount' {...this.formLayout} label='库存数'>
        {getFieldDecorator('amount', {
          initialValue: formVals.callNo,
          rules: [
            {
              required: true,
              message: '请输入数量',
            },
          ],
        })(<Input type='number' placeholder='请输入数量' />)}
      </Form.Item>,
      <Form.Item key='productDesc' {...this.formLayout} label='商品描述'>
        {getFieldDecorator('productDesc', {
          initialValue: formVals.productDesc,
          rules: [
            {
              required: true,
              message: '请输入商品信息',
            },
          ],
        })(<Input.TextArea rows={4} placeholder='请输入商品信息' />)}
      </Form.Item>,
    ]
  }

  renderFooter = (currentStep) => {
    const { onCancel: handleUpdateModalVisible, values } = this.props
    return [
      <Button
        key='cancel'
        onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key='forward' type='primary' onClick={() => this.handleUpdate()}>
        确认修改
      </Button>,
    ]
  }

  render() {
    const {
      updateModalVisible,
      onCancel: handleUpdateModalVisible,
      values,
    } = this.props
    const { currentStep, formVals } = this.state
    return (
      <Modal
        width={660}
        bodyStyle={{
          padding: '32px 40px 48px',
        }}
        destroyOnClose
        title='库存基本信息编辑'
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    )
  }
}

export default Form.create()(UpdateForm)
