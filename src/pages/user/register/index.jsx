import { Form } from 'antd'
import React, { useState } from 'react'
import { connect } from 'dva'
import { isMobile } from '@/utils/utils'
import styles from './style.less'
import RegisterForm from './RegisterForm'

const register = (props) => {
  console.log(props) // const { userLogin = {}, submitting } = props;

  const handleSubmit = (values) => {
    const { dispatch } = props
    dispatch({
      type: 'login/register',
      payload: { ...values },
    })
  }
  const WrappedForm = Form.create({ name: 'validate_reguster' })(RegisterForm)

  return (
    <div className={styles.main}>
      <WrappedForm isMobile={isMobile} submit={handleSubmit} />
    </div>
  )
}

export default connect(({ login, loading }) => ({
  isRegister: login.isRegister,
  submitting: loading.effects['login/register'],
}))(register)
