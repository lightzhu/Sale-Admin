import React, { useState } from "react";
import { Link } from "umi";
import { connect } from "dva";
import styles from "./style.less";
import LoginForm from "./components/LoginForm";
const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  // const [autoLogin, setAutoLogin] = useState(true);
  // const [type, setType] = useState("account");
  return (
    <div className={styles.main}>
      <LoginForm userLogin={userLogin} status={status} submitting={submitting}></LoginForm>
      <div className={styles.other}>
        <Link className={styles.register} to="/user/register">
          注册账户
          </Link>
      </div>
    </div>
  );
};
export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))(Login);
