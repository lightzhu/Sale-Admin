import { Form, Button, Divider, Input, Select } from 'antd';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const formItemFirst = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 9,
  },
};

const BasicInfo = props => {
  const { form, dispatch, data, category } = props;
  const secondCate = Object.values(category)[0];
  console.log(secondCate)
  const firstCate = Object.keys(category);
  console.log(data)

  // if (!data) {
  //   return null;
  // }

  const creatCategory = (options) => {
    return options.map((item, index) => {
      return <Option value={item} key={index}>{item}</Option>
    })
  }
  const { getFieldDecorator, validateFields } = form;

  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'commodity/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'commodity/saveCurrentStep',
          payload: 'confirm',
        });
      }
    });
  };

  return (
    <Fragment>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item {...formItemLayout} label="商品名称">
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [
              {
                required: true,
                message: '请输入商品名称',
              },
            ],
          })(<Input placeholder="请输入商品名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="选择类目">
          {getFieldDecorator('payAccount', {
            initialValue: '请选择',
            rules: [
              {
                required: true,
                message: '请选择商品类目',
              },
            ],
          })(
            <Select placeholder="test@example.com">
              {creatCategory(firstCate)}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="二级目录">
          {getFieldDecorator('payAccount', {
            initialValue: '请选择',
            rules: [
              {
                required: true,
                message: '请选择二级目录',
              },
            ],
          })(
            <Select placeholder="二级目录">
              {creatCategory(secondCate)}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="单价">
          {getFieldDecorator('price', {
            initialValue: data.price,
            rules: [
              {
                required: true,
                message: '请输入单价',
              },
            ],
          })(<Input placeholder="请输入单价" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="付款方式">
          {getFieldDecorator('payType', {
            initialValue: '请选择',
            rules: [
              {
                required: true,
                message: '请选择付款方式',
              },
            ],
          })(
            <Select placeholder="付款方式">
              <Option value="alipay">支付宝</Option>
              <Option value="bank">银行账户</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品描述">
          {getFieldDecorator('receiverName', {
            initialValue: data.receiverName,
            rules: [
              {
                required: true,
                message: '请输入商品信息',
              },
            ],
          })(<Input.TextArea rows={4} placeholder="请输入商品信息" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="退货说明">
          {getFieldDecorator('amount', {
            initialValue: data.amount,
            rules: [
              {
                required: true,
                message: '请输入退货说明',
              },
              // {
              //   pattern: /^(\d+)((?:\.\d+)?)$/,
              //   message: '请输入合法金额数字',
              // },
            ],
          })(<Input prefix="￥" placeholder="退货说明" />)}
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
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
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
  );
};

export default connect(({ commodity }) => ({
  data: commodity.step,
}))(Form.create()(BasicInfo));
