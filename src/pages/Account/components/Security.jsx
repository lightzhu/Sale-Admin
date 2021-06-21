import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import React, { Component } from 'react'
import { connect } from 'dva'
import { messageShow } from '@/utils/utils'
import { List, Modal, Input, message } from 'antd'

class SecurityView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modText: '',
      modTitle: '',
      modKey: '',
      modVisible: false,
    }
  }
  handleModinfo(key) {
    const { currentUser } = this.props
    console.log(key)
    this.setState({
      modText: currentUser[key],
      modTitle: `修改${key}`,
      modVisible: true,
      modKey: key,
      newPassword: '',
      password: '',
    })
  }
  handleOk = (e) => {
    const { modKey, modText, password, newPassword } = this.state
    let param = { id: window.sessionStorage.getItem('id') || '' }
    param[modKey] = modText
    if (modKey == 'password') {
      param['oldPassword'] = password
      param[modKey] = newPassword
      this.props
        .request('/user/updatePassword', {
          method: 'POST',
          data: param,
        })
        .then((res) => {
          messageShow(res)
          if (res.status == 200) {
            const { dispatch } = this.props
            setTimeout(() => {
              if (dispatch) {
                dispatch({
                  type: 'login/logout',
                })
              }
            }, 1000)
          }
        })
    } else {
      this.props
        .request('/user/updateMerchant', {
          method: 'POST',
          data: param,
        })
        .then((res) => {
          messageShow(res)
        })
    }

    this.setState({
      modVisible: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      modVisible: false,
    })
  }
  onChange(e) {
    const { modKey } = this.state
    const { value } = e.target
    if (modKey == 'password') {
      this.setState({
        password: value,
      })
    } else {
      this.setState({
        modText: value,
      })
    }
  }
  reInput(e) {
    this.setState({
      newPassword: e.target.value,
    })
  }
  checkPassword() {
    const { password, rePassword } = this.state
    if (password != rePassword) {
      message.error('两次输入密码不一样')
    }
  }
  getData = () => {
    const { password, company } = this.props.currentUser
    return [
      {
        title: formatMessage(
          {
            id: 'account.security.password',
          },
          {}
        ),
        description: `Current password：${password}`,
        actions: [
          <a key='Modify' onClick={this.handleModinfo.bind(this, 'password')}>
            <FormattedMessage
              id='account.security.modify'
              defaultMessage='Modify'
            />
          </a>,
        ],
      },
      {
        title: 'Bank Account',
        description: `Account Number：************`,
        actions: [
          <a key='Set' onClick={this.handleModinfo.bind(this, 'account')}>
            <FormattedMessage id='account.security.set' defaultMessage='Set' />
          </a>,
        ],
      },
      {
        title: 'Company Name',
        description: `${company}`,
        actions: [
          <a key='Modify' onClick={this.handleModinfo.bind(this, 'company')}>
            <FormattedMessage
              id='account.security.modify'
              defaultMessage='Modify'
            />
          </a>,
        ],
      },
    ]
  }

  render() {
    const data = this.getData()
    return (
      <>
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Modal
          title={this.state.modTitle}
          visible={this.state.modVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Input
            value={
              this.state.modKey == 'password'
                ? this.state.password
                : this.state.modText
            }
            placeholder={
              this.state.modKey == 'password' ? '请输入老密码' : '请输入'
            }
            onChange={this.onChange.bind(this)}
          />
          <Input
            value={this.state.newPassword}
            type='password'
            placeholder='请输入新密码'
            style={{
              marginTop: '20px',
              display: this.state.modKey == 'password' ? 'block' : 'none',
            }}
            onChange={this.reInput.bind(this)}
            // onBlur={this.checkPassword.bind(this)}
          />
        </Modal>
      </>
    )
  }
}
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(SecurityView)
