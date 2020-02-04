import React from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
import styles from './index.less';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

class RegisterForm extends React.Component {
  constructor(d) {
    super(d)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <div id="components-form-demo-validate-static">
          <Form {...formItemLayout}>
            <Form.Item label="Email">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Should be combination of numbers & alphabets',
                  },
                ],
              })
                (<Input placeholder="Please input your email" />)}
            </Form.Item>

            <Form.Item label="Warning" validateStatus="warning">
              <Input placeholder="Warning" id="warning" />
            </Form.Item>

            <Form.Item
              label="Validating"
              hasFeedback
              validateStatus="validating"
              help="The information is being validated..."
            >
              <Input placeholder="I'm the content is being validated" id="validating" />
            </Form.Item>

            <Form.Item label="Success" hasFeedback validateStatus="success">
              <Input placeholder="I'm the content" id="success" />
            </Form.Item>

            <Form.Item label="Warning" hasFeedback validateStatus="warning">
              <Input placeholder="Warning" id="warning2" />
            </Form.Item>

            <Form.Item
              label="Fail"
              hasFeedback
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input placeholder="unavailable choice" id="error2" />
            </Form.Item>

            <Form.Item label="Success" hasFeedback validateStatus="success">
              <DatePicker
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item label="Warning" hasFeedback validateStatus="warning">
              <TimePicker
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item label="Error" hasFeedback validateStatus="error">
              <Select defaultValue="1">
                <Option value="1">Option 1</Option>
                <Option value="2">Option 2</Option>
                <Option value="3">Option 3</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Validating"
              hasFeedback
              validateStatus="validating"
              help="The information is being validated..."
            >
              <Cascader defaultValue={['1']} options={[]} />
            </Form.Item>

            <Form.Item
              label="inline"
              style={{
                marginBottom: 0,
              }}
            >
              <Form.Item
                validateStatus="error"
                help="Please select the correct date"
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 12px)',
                }}
              >
                <DatePicker />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center',
                }}
              >
                -
          </span>
              <Form.Item
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 12px)',
                }}
              >
                <DatePicker />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Success" hasFeedback validateStatus="success">
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
export default RegisterForm;
