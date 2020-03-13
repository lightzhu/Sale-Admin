import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Modal, Input, message } from 'antd'

class SecurityView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modText: '',
      modTitle: '',
      modKey: '',
      modVisible: false
    }
  }
  handleModinfo(key) {
    const { currentUser } = this.props
    console.log(key)
    this.setState({
      modText: currentUser[key],
      modTitle: `修改${key}`,
      modVisible: true,
      modKey: key
    })
  }
  handleOk = e => {
    const { modKey, modText } = this.state
    this.props
      .request('/api/modCurrentUser', {
        method: 'POST',
        data: { modKey: modText }
      })
      .then(res => {
        console.log(res)
        message.success(res.msg)
      })

    this.setState({
      modVisible: false
    })
  }

  handleCancel = e => {
    this.setState({
      modVisible: false
    })
  }
  onChange(e) {
    const { value } = e.target
    this.setState({
      modText: value
    })
  }
  getData = () => {
    const { password, company } = this.props.currentUser
    return [
      {
        title: formatMessage(
          {
            id: 'account.security.password'
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
          </a>
        ]
      },
      {
        title: 'Bank Account',
        description: `Account Number：************`,
        actions: [
          <a key='Set' onClick={this.handleModinfo.bind(this, 'account')}>
            <FormattedMessage id='account.security.set' defaultMessage='Set' />
          </a>
        ]
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
          </a>
        ]
      }
    ]
  }

  render() {
    const data = this.getData()
    return (
      <>
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
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
            value={this.state.modText}
            placeholder='请输入'
            onChange={this.onChange.bind(this)}
          />
        </Modal>
      </>
    )
  }
}
export default connect(({ user }) => ({
  currentUser: user.currentUser
}))(SecurityView)
