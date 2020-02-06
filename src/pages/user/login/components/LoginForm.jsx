import { Alert, Checkbox, Form, Input, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "dva";
import styles from "./index.less";
import Submit from "./LoginSubmit";

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24
    }}
    message={content}
    type="error"
    showIcon
  />
);
@connect(({ loading }) => ({ loading }))
class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoLogin: true,
      type: "account"
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({
        type: "login/login",
        payload: { ...values, type: this.state.type }
      })
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoLogin, type } = this.state
    const { userLogin = {}, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <div>
            {status === "error" && loginType === "account" && !submitting && (
              <LoginMessage content="账户或密码错误（admin/ant.design）" />
            )}
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名: admin or user"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码: ant.design"
                />,
              )}
            </Form.Item>
          </div>
          <div>
            <Checkbox
              checked={autoLogin}
              onChange={e => setAutoLogin(e.target.checked)}
            >
              自动登录
          </Checkbox>
            <a style={{ float: "right" }}>忘记密码</a>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Form>
      </>
    );
  }
}
const NormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export default NormalLoginForm;

