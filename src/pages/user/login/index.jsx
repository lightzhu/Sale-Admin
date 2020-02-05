import { Alert, Checkbox, Form } from "antd";
import React, { useState } from "react";
import { Link } from "umi";
import { connect } from "dva";
// import classNames from "classnames";
import styles from "./style.less";
import Submit from "./components/LoginSubmit";
import LoginItems from "./components/LoginItem";
const { UserName, Password } = LoginItems

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
// @Form.create()
const Login = props => {
  // console.log(props)
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState("account");

  const handleSubmit = () => {
    const { dispatch } = this.props
    // const { validateFieldsAndScroll } = form
    console.log(this.props.form.getFieldsValue);
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({
        type: "login/login",
        payload: { ...values, type }
      })
    })

  };

  return (
    <div className={styles.main}>
      <Form onSubmit={handleSubmit}>
        <div>
          {status === "error" && loginType === "account" && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="userName"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: "请输入用户名!"
              }
            ]}
          />
          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: "请输入密码！"
              }
            ]}
          />
        </div>
        <div>
          <Checkbox
            checked={autoLogin}
            onChange={e => setAutoLogin(e.target.checked)}
          >
            自动登录
          </Checkbox>
          <a
            style={{
              float: "right"
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </Form>
    </div>
  );
};
// const myLogin = Form.create(Login)
export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))(Login);
