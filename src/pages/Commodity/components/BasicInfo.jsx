import { Form, Button, Divider, Input, Select } from 'antd'
import React, { Fragment } from 'react'
import { connect } from 'dva'
import styles from './index.less'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
}

const BasicInfo = (props) => {
  const { form, dispatch, data, category, shopInfo, shopsList } = props
  const secondCate = Object.values(category)[0]
  const firstCate = Object.keys(category)
  // console.log(data)
  if (dispatch && !shopsList.length) {
    dispatch({
      type: 'shop/fetchShops',
      payload: { id: window.localStorage.getItem('id') },
    })
  }
  const creatCategory = (options) => {
    return options.map((item, index) => {
      return (
        <Option value={item.val} key={index}>
          {item.name}
        </Option>
      )
    })
  }
  const { getFieldDecorator, validateFields } = form

  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'commodity/saveBasicInfo',
          payload: values,
        })
        // dispatch({
        //   type: 'commodity/saveCurrentStep',
        //   payload: 'confirm',
        // })
      }
    })
  }
  const creatShopList = () => {
    return shopsList.map((item, index) => {
      return (
        <Option value={item.id} key={index}>
          {item.name}
        </Option>
      )
    })
  }
  return (
    <Fragment>
      <Form layout='horizontal' className={styles.stepForm}>
        <Form.Item {...formItemLayout} label='店铺编号'>
          {getFieldDecorator('shopId', {
            initialValue: data.shopId,
            rules: [
              {
                required: true,
                message: '请输入店铺编号',
              },
            ],
          })(<Select placeholder='付款方式'>{creatShopList()}</Select>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='商品名称'>
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [
              {
                required: true,
                message: '请输入商品名称',
              },
            ],
          })(<Input placeholder='请输入商品名称' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='副标题'>
          {getFieldDecorator('subTitle', {
            initialValue: data.subTitle,
            rules: [
              {
                required: true,
                message: '请输入副标题',
              },
            ],
          })(<Input placeholder='请输入副标题' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='选择类目'>
          {getFieldDecorator('firstCategory', {
            initialValue: data.firstCategory,
            rules: [
              {
                required: true,
                message: '请选择商品类目',
              },
            ],
          })(
            <Select placeholder='选择商品主类目'>
              {creatCategory(firstCate)}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='二级目录'>
          {getFieldDecorator('typeId', {
            initialValue: data.typeId,
            rules: [
              {
                required: true,
                message: '请选择二级目录',
              },
            ],
          })(
            <Select placeholder='二级目录'>{creatCategory(secondCate)}</Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='库存'>
          {getFieldDecorator('amount', {
            initialValue: data.amount,
            rules: [
              {
                required: true,
                message: '请输入库存',
              },
            ],
          })(<Input type='number' placeholder='请输入库存' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='付款方式'>
          {getFieldDecorator('payWay', {
            initialValue: data.payWay,
            rules: [
              {
                required: true,
                message: '请选择付款方式',
              },
            ],
          })(
            <Select placeholder='付款方式'>
              <Option value='1'>支付宝</Option>
              <Option value='2'>银行账户</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='商品描述'>
          {getFieldDecorator('productDesc', {
            initialValue: data.productDesc,
            rules: [
              {
                required: true,
                message: '请输入商品信息',
              },
            ],
          })(<Input.TextArea rows={4} placeholder='请输入商品信息' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='退货说明'>
          {getFieldDecorator('returnDesc', {
            initialValue: data.returnDesc,
            rules: [
              {
                required: true,
                message: '请输入退货说明',
              },
            ],
          })(<Input placeholder='退货说明' />)}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=''>
          <Button type='primary' onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
        <h3>说明</h3>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </div>
    </Fragment>
  )
}

export default connect(({ commodity, shop }) => ({
  data: commodity.product,
  shopInfo: shop.shopInfo,
  shopsList: shop.shopsList,
}))(Form.create()(BasicInfo))
