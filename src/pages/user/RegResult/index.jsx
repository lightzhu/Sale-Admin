import { Button, Result } from 'antd'
import { Link } from 'umi'
import React from 'react'
import styles from './style.less'

const emailMap = {
  'qq.com': 'http://mail.qq.com',
  'gmail.com': 'http://mail.google.com',
  'sina.com': 'http://mail.sina.com.cn',
  '163.com': 'http://mail.163.com',
  '126.com': 'http://mail.126.com',
  'yeah.net': 'http://www.yeah.net/',
  'sohu.com': 'http://mail.sohu.com/',
  'tom.com': 'http://mail.tom.com/',
  'sogou.com': 'http://mail.sogou.com/',
  '139.com': 'http://mail.10086.cn/',
  'hotmail.com': 'http://www.hotmail.com',
  'live.com': 'http://login.live.com/',
  'live.cn': 'http://login.live.cn/',
  'live.com.cn': 'http://login.live.com.cn',
  '189.com': 'http://webmail16.189.cn/webmail/',
  'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
  'yahoo.cn': 'http://mail.cn.yahoo.com/',
  'eyou.com': 'http://www.eyou.com/',
  '21cn.com': 'http://mail.21cn.com/',
  '188.com': 'http://www.188.com/',
  'foxmail.com': 'http://www.foxmail.com',
  'outlook.com': 'http://www.outlook.com',
}
const getEamilLocation = (str) => {
  var _mail = str.split('@')[1] //获取邮箱域
  for (var j in emailMap) {
    if (j == _mail) {
      return emailMap[_mail] //获取邮箱登陆链接
    }
  }
}

const RegisterResult = () => {
  let email = window.sessionStorage.getItem('email')
  const actions = (
    <div className={styles.actions}>
      <Button size='large' type='primary' href={getEamilLocation(email)}>
        View mailbox
      </Button>
      <Link to='/user/login'>
        <Button size='large'>Back to home</Button>
      </Link>
    </div>
  )

  return (
    <Result
      className={styles.registerResult}
      status='success'
      title={<div className={styles.title}>{email}</div>}
      subTitle='The activation email has been sent to your email address and is valid for 24 hours. Please log in to the email in time and click on the link in the email to activate the account.'
      extra={actions}
    />
  )
}

export default RegisterResult
