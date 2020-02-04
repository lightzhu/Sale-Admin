import { Alert, Checkbox, Form } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva'; // import { Form } from '@ant-design/compatible'

import styles from './style.less';
import RegisterForm from './RegisterForm'; // @Form.create()

const register = props => {
  console.log(props); // const { userLogin = {}, submitting } = props;
  // const { status, type: loginType } = userLogin;
  // const [autoLogin, setAutoLogin] = useState(true);
  // const [type, setType] = useState("account");

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'register/register',
      payload: { ...values, type },
    });
  };
  const WrappedForm = Form.create({ name: 'validate_reguster' })(RegisterForm);

  return (
    <div className={styles.main}>
      <WrappedForm />
    </div>
  );
};

export default register;
