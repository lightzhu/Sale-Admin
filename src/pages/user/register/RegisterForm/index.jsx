import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import styles from './index.less'

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
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 4,
    },
    sm: {
      span: 12,
      offset: 4,
    },
  },
}
class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPhoneNum: '',
      confirmDirty: false,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const submit = this.props.submit
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        submit(values)
      } else {
        console.log(values)
      }
    })
  }
  formReset = () => {
    this.props.form.resetFields()
  }
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    console.log(value, form.getFieldValue('password'))
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  handleConfirmBlur = (e) => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  validPhoneNum = (e) => {
    const { isMobile } = this.props
    const { value } = e.target
    if (value.toString().trim().length == 0 || isMobile(value)) {
      this.setState({
        isPhoneNum: 'success',
      })
    } else {
      this.setState({
        isPhoneNum: 'error',
      })
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.container}>
        <div id='components-form-demo-validate-static'>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='nickname' hasFeedback>
              {getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: 'Should be a nick name',
                  },
                ],
              })(<Input placeholder='Please input nick name' />)}
            </Form.Item>
            <Form.Item label='E-mail' hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input placeholder='Please input your email' />)}
            </Form.Item>
            <Form.Item label='UserName' hasFeedback>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Should be only alphabets',
                  },
                ],
              })(<Input placeholder='Please input name' maxLength={20} />)}
            </Form.Item>
            <Form.Item label='Password' hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label='Confirm Password' hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
              label='Phone Number'
              validateStatus={this.state.isPhoneNum}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: false,
                    message: 'Please input your phone number!',
                  },
                ],
              })(
                <Input style={{ width: '100%' }} onBlur={this.validPhoneNum} />
              )}
            </Form.Item>

            {/* <Form.Item label="Error" hasFeedback validateStatus="error">
              <Select defaultValue="1">
                <Option value="1">Option 1</Option>
                <Option value="2">Option 2</Option>
                <Option value="3">Option 3</Option>
              </Select>
            </Form.Item> */}

            <Form.Item {...tailFormItemLayout}>
              <div className={styles.btns}>
                <div>
                  <Button type='primary' onClick={this.formReset}>
                    Reset
                  </Button>
                </div>
                <div offset={5}>
                  <Button type='primary' htmlType='submit'>
                    Register
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
export default RegisterForm
