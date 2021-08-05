import { Button, Upload, Input, Icon, Modal, Select, Form, message } from 'antd'
import React, { Component } from 'react'
import { updateProductInfo, addProductPic, removeProductPic } from '../service'
import { connect } from 'dva'
import Variantion from '@/pages/Commodity/components/Variantion'
const FormItem = Form.Item
const { Option } = Select

class UpdateForm extends Component {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {}
  }

  formLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    }
  }
  blockLayout = {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 21
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      formVals: props.values,
      currentStep: 0
    }
  }
  handleUpdate = () => {
    const { form, onSubmit, variantion } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const formVals = { ...fieldsValue }
      // console.log(formVals)
      // console.log(variantion)
      let params = Object.assign(formVals, { _id: this.state.formVals._id, spec_goods: variantion })
      updateProductInfo(params).then((info) => {
        console.log(info)
        if (info.status == '1') {
          onSubmit()
        } else {
          return message.error(info.message)
        }
      })
    })
  }
  handleChange = (obj) => {
    const { dispatch, fileList } = this.props
    if (obj.file.status == 'done') {
      const formData = new FormData()
      formData.append('file', obj.file.originFileObj)
      formData.append('_id', this.state.formVals._id)
      addProductPic(formData).then((info) => {
        console.log(info)
        if (info.status == '1') {
          return message.success(info.message)
        } else {
          return message.error(info.message)
        }
      })
    } else if (obj.file.status == 'removed') {
      console.log(obj.file)
      removeProductPic({ _id: this.state.formVals._id, url: obj.file.url }).then((info) => {
        console.log(info)
        if (info.status == '1') {
          return message.success(info.message)
        } else {
          return message.error(info.message)
        }
      })
    }
    if (dispatch) {
      dispatch({
        type: 'commodity/saveFileList',
        payload: obj.fileList
      })
    }
  }
  adapterFileList = (list) => {
    return list.map((item, key) => {
      return {
        uid: key,
        status: 'done',
        url: item
      }
    })
  }
  renderContent = (currentStep, formVals) => {
    const { form, fileList } = this.props
    const { getFieldDecorator } = form
    console.log(formVals)

    // 基本信息的模版
    return [
      <FormItem key="title" {...this.formLayout} label="商品名称">
        {getFieldDecorator('title', {
          initialValue: formVals.title,
          rules: [
            {
              required: true,
              message: '请输入商品名称'
            }
          ]
        })(<Input placeholder="请输入商品名称" />)}
      </FormItem>,
      <FormItem key="sub_title" {...this.formLayout} label="副标题">
        {getFieldDecorator('sub_title', {
          initialValue: formVals.sub_title,
          rules: [
            {
              required: true,
              message: '请输入副标题'
            }
          ]
        })(<Input placeholder="请输入副标题" />)}
      </FormItem>,
      <FormItem key="pay_type" {...this.formLayout} label="付款方式">
        {getFieldDecorator('pay_type', {
          initialValue: '支付宝',
          rules: [
            {
              required: true,
              message: '请选择付款方式'
            }
          ]
        })(
          <Select style={{ width: '100%' }} placeholder="付款方式" mode="multiple">
            <Option value="支付宝">支付宝</Option>
            <Option value="微信">微信</Option>
            <Option value="云闪付">云闪付</Option>
            <Option value="银行卡">银行卡</Option>
            <Option value="线下支付">线下支付</Option>
          </Select>
        )}
      </FormItem>,
      <FormItem key="return_desc" {...this.formLayout} label="退货描述">
        {getFieldDecorator('return_desc', {
          initialValue: formVals.return_desc,
          rules: [
            {
              required: true,
              message: '请输入退换货描述'
            }
          ]
        })(<Input placeholder="请输入退换货描述" />)}
      </FormItem>,
      <div key="describe" className="describe">
        <FormItem key="description" {...this.blockLayout} label="商品描述">
          {getFieldDecorator('description', {
            initialValue: formVals.description,
            rules: [
              {
                required: true,
                message: '请输入商品信息'
              }
            ]
          })(<Input.TextArea rows={2} placeholder="请输入商品信息" />)}
        </FormItem>
      </div>,
      <div key="image_list" className="clearfix image-list-box">
        <div className="label">图片列表：</div>
        <Upload listType="picture-card" fileList={fileList} onChange={this.handleChange}>
          {fileList.length >= 5 ? null : (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </div>,
      <div key="spec_goods" className="clearfix image-list-box">
        <div className="label">规格列表：</div>
        <Variantion spec_goods={formVals.spec_goods}></Variantion>
      </div>
    ]
  }

  renderFooter = (currentStep) => {
    const { onCancel: handleUpdateModalVisible, values } = this.props
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleUpdate()}>
        确认修改
      </Button>
    ]
  }

  render() {
    const { updateModalVisible, onCancel: handleUpdateModalVisible, values } = this.props
    const { currentStep, formVals } = this.state
    return (
      <Modal
        width={800}
        bodyStyle={{
          padding: '8px 10px'
        }}
        destroyOnClose
        title="库存基本信息编辑"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(currentStep, formVals)}
      </Modal>
    )
  }
}

export default connect(({ commodity }) => ({
  fileList: commodity.fileList
}))(Form.create()(UpdateForm))
