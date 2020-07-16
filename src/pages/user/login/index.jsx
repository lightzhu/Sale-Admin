import React, { useState } from 'react'
import { Link } from 'umi'
import { connect } from 'dva'
import styles from './style.less'
import LoginForm from './components/LoginForm'
const Login = props => {
  const { userLogin = {} } = props
  const { status, type: loginType } = userLogin
  // const [autoLogin, setAutoLogin] = useState(true);
  // const [type, setType] = useState("account");
  return (
    <div className={styles.main}>
      <LoginForm userLogin={userLogin} status={status}></LoginForm>
      <div className={styles.other}>
        <a style={{ float: 'left' }}>忘记密码</a>
        <Link className={styles.register} to='/user/register'>
          注册账户
        </Link>
      </div>
    </div>
  )
}
export default connect(({ login, loading }) => ({
  userLogin: login
}))(Login)
