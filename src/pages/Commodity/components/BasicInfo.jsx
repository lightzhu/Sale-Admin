import { Form, Button, Divider, Input, Select } from 'antd'
import React, { Fragment, useState } from 'react'
import { connect } from 'dva'
import { getProductCategory } from '@/services/category'
import styles from './index.less'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
}
const BasicInfo = (props) => {
  const [category, setcategory] = useState([])
  const { form, dispatch, data, shopInfo, shopsList } = props
  const secondCate = Object.values(category)[0]
  // console.log(data)
  const getCategory = (val) => {
    const _shopInfo = shopsList.find((item) => item.id == val)
    console.log(_shopInfo.category)
    getProductCategory({ id: _shopInfo.category }).then((res) => {
      if (res.status == 1) {
        console.log(1)
        setcategory(res.data)
      }
    })
  }
  const creatCategory = (options) => {
    return options.map((item, index) => {
      return (
        <Option value={item.id} key={index}>
          {item.name}
        </Option>
      )
    })
  }
  const { getFieldDecorator, validateFields } = form

  const onValidateForm = () => {
    validateFields((err, values) => {
      console.log(values)
      if (!err && dispatch) {
        dispatch({
          type: 'commodity/saveBasicInfo',
          payload: values
        })
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
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="店铺编号">
          {getFieldDecorator('shop_id', {
            initialValue: data.shop_id,
            rules: [
              {
                required: true,
                message: '请输入店铺编号'
              }
            ]
          })(
            <Select placeholder="选择店铺" onChange={getCategory}>
              {creatShopList()}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品名称">
          {getFieldDecorator('title', {
            initialValue: data.title,
            rules: [
              {
                required: true,
                message: '请输入商品名称'
              }
            ]
          })(<Input placeholder="请输入商品名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="副标题">
          {getFieldDecorator('sub_title', {
            initialValue: data.sub_title,
            rules: [
              {
                required: true,
                message: '请输入副标题'
              }
            ]
          })(<Input placeholder="请输入副标题" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品类目">
          {getFieldDecorator('category_id', {
            initialValue: data.category_id,
            rules: [
              {
                required: true,
                message: '请选择商品类目'
              }
            ]
          })(<Select placeholder="商品类目">{creatCategory(category)}</Select>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="库存">
          {getFieldDecorator('stock', {
            initialValue: data.stock,
            rules: [
              {
                required: true,
                message: '请输入库存'
              }
            ]
          })(<Input type="number" placeholder="请输入库存" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="付款方式">
          {getFieldDecorator('pay_type', {
            initialValue: data.pay_type,
            rules: [
              {
                required: true,
                message: '请选择付款方式'
              }
            ]
          })(
            <Select placeholder="付款方式" mode="multiple">
              <Option value="支付宝">支付宝</Option>
              <Option value="微信">微信</Option>
              <Option value="云闪付">云闪付</Option>
              <Option value="银行卡">银行卡</Option>
              <Option value="线下支付">线下支付</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品描述">
          {getFieldDecorator('description', {
            initialValue: data.description,
            rules: [
              {
                required: true,
                message: '请输入商品信息'
              }
            ]
          })(<Input.TextArea rows={4} placeholder="请输入商品信息" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="退货说明">
          {getFieldDecorator('return_desc', {
            initialValue: data.return_desc,
            rules: [
              {
                required: true,
                message: '请输入退货说明'
              }
            ]
          })(<Input placeholder="退货说明" />)}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span
            }
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px'
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
  shopsList: shop.shopsList
}))(Form.create()(BasicInfo))
