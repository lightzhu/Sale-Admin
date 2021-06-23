import { Button, Input, Select, Upload, Form, message, Modal } from 'antd'
import { FormOutlined, UploadOutlined } from '@ant-design/icons'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import React, { Component } from 'react'
import { connect } from 'dva'
import GeographicView from './GeographicView'
import { messageShow, isMobile } from '@/utils/utils'
import PhoneView from './PhoneView'
import styles from './BaseView.less'

const { Option } = Select // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar, onAvatarChange }) => (
  <>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false} onChange={onAvatarChange} accept="image/*">
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          Change avatar
        </Button>
      </div>
    </Upload>
  </>
)

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value
  if (!province.key) {
    callback('Please input your province!')
  }
  if (!city.key) {
    callback('Please input your city!')
  }
  callback()
}

const validatorPhone = (rule, value, callback) => {
  // const values = value.split('-')
  // if (!values[0]) {
  //   callback('Please input your area code!')
  // }
  // if (!values[1]) {
  //   callback('Please input your phone number!')
  // }
  if (!isMobile(value)) {
    callback('请输入正确的手机号!')
  }
  callback()
}

class BaseAcount extends Component {
  view = undefined
  constructor(props) {
    super(props)
    this.state = {
      modText: '',
      modTitle: '',
      modKey: '',
      inputType: 'text',
      modVisible: false
    }
  }
  onAvatarChange = (info) => {
    const { dispatch } = this.props
    if (info.file.status === 'done') {
      console.log(info)
      const { file } = info
      const formData = new FormData()
      // fileList.forEach(file => {})
      if (file.size > 256 * 1024) {
        return message.error('头像不能大于256kb！')
      }
      formData.append('file', file.originFileObj)
      dispatch({
        type: 'user/updateAvatar',
        payload: formData
      })
    }
  }
  getAvatarURL() {
    const { currentUser } = this.props
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      return url
    }
    return ''
  }

  getViewDom = (ref) => {
    this.view = ref
  }
  setOptions = () => {
    let countrys = [
      {
        name: '中国',
        value: 0
      },
      {
        name: '美国',
        value: 1
      }
    ]
    return countrys.map((item) => {
      return (
        <Option value={item.value} key={item}>
          {item.name}
        </Option>
      )
    })
  }
  handleFinish = () => {
    message.success(
      formatMessage({
        id: 'account.basic.update.success'
      })
    )
  }
  handleModinfo(key, type = 'text') {
    const { currentUser } = this.props
    console.log(type)
    this.setState({
      modText: currentUser[key],
      modTitle: `修改${key}`,
      modVisible: true,
      modKey: key,
      inputType: type
    })
  }
  handleOk = async (e) => {
    // console.log(this.props.request)
    const { modKey, modText } = this.state
    if (this.state.inputType == 'tel') {
      if (!isMobile(modText)) {
        return message.error('手机号不正确！')
      }
    }
    let param = { id: window.sessionStorage.getItem('id') || '' }
    param[modKey] = modText

    await this.props.dispatch({
      type: 'user/updateAdminInfo',
      payload: param
    })
    // .then((res) => {
    //   messageShow(res)
    // })
    this.setState({
      modVisible: false
    })
  }

  handleCancel = (e) => {
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
  render() {
    const { currentUser } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            // onFinish={this.handleFinish}
            initialvalues={currentUser}
            hideRequiredMark
          >
            <Form.Item name="email" label="email">
              {getFieldDecorator('email', {
                initialValue: currentUser.email,
                rules: [
                  {
                    required: true,
                    message: 'email is required'
                  }
                ]
              })(
                <Input
                  placeholder="email is required"
                  disabled
                  addonAfter={<FormOutlined onClick={this.handleModinfo.bind(this, 'email')} />}
                />
              )}
            </Form.Item>
            <Form.Item name="user_name" label="userName">
              {getFieldDecorator('user_name', {
                initialValue: currentUser.user_name,
                rules: [
                  {
                    required: true,
                    message: 'name is required'
                  }
                ]
              })(
                <Input
                  placeholder="name is required"
                  disabled
                  addonAfter={<FormOutlined onClick={this.handleModinfo.bind(this, 'user_name')} />}
                />
              )}
            </Form.Item>
            <Form.Item name="nickname" label="nickname">
              {getFieldDecorator('nickname', {
                initialValue: currentUser.nickname,
                rules: [
                  {
                    required: true,
                    message: 'nickname is required'
                  }
                ]
              })(
                <Input
                  placeholder="nickname is required"
                  disabled
                  addonAfter={<FormOutlined onClick={this.handleModinfo.bind(this, 'nickname')} />}
                />
              )}
            </Form.Item>
            <Form.Item name="countryId" label="country">
              <Select value={currentUser.countryId ? 1 : 0}>{this.setOptions()}</Select>
            </Form.Item>
            {/* <Form.Item
              name='geographic'
              label={formatMessage({
                id: 'account.basic.geographic'
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'account.basic.geographic-message'
                    },
                    {}
                  )
                },
                {
                  validator: validatorGeographic
                }
              ]}>
              <GeographicView />
            </Form.Item> */}
            <Form.Item
              name="address"
              label={formatMessage({
                id: 'account.basic.address'
              })}
            >
              {getFieldDecorator('address', {
                initialValue: currentUser.address
              })(
                <Input
                  placeholder="input your address"
                  disabled
                  addonAfter={<FormOutlined onClick={this.handleModinfo.bind(this, 'address')} />}
                />
              )}
            </Form.Item>

            <Form.Item
              name="phone"
              label={formatMessage({
                id: 'account.basic.phone'
              })}
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              {getFieldDecorator('phone', {
                initialValue: currentUser.phone
              })(
                <Input
                  placeholder="input your phone"
                  addonAfter={<FormOutlined onClick={this.handleModinfo.bind(this, 'phone', 'tel')} />}
                />
              )}
            </Form.Item>
            {/* <Form.Item
              name='phone'
              label={formatMessage({
                id: 'account.basic.phone',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'account.basic.phone-message',
                    },
                    {}
                  ),
                },
                {
                  validator: validatorPhone,
                },
              ]}>
              <PhoneView value={currentUser.phone} />
            </Form.Item> */}
            <Form.Item name="profile" label="profile">
              {getFieldDecorator('profile', {
                initialValue: currentUser.profile,
                rules: [
                  {
                    required: true,
                    message: 'input your profile'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder="account.basic.profile-placeholder"
                  rows={4}
                  onClick={this.handleModinfo.bind(this, 'profile')}
                />
              )}
            </Form.Item>
            {/* <Form.Item>
              <Button htmlType='submit' type='primary'>
                <FormattedMessage
                  id='account.basic.update'
                  defaultMessage='Update Information'
                />
              </Button>
            </Form.Item> */}
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} onAvatarChange={this.onAvatarChange} />
        </div>
        <Modal title={this.state.modTitle} visible={this.state.modVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Input
            value={this.state.modText}
            placeholder="请输入"
            type={this.state.inputType}
            onChange={this.onChange.bind(this)}
          />
        </Modal>
      </div>
    )
  }
}
const BaseView = Form.create({ name: 'currentUser' })(BaseAcount)
export default connect(({ user }) => ({ currentUser: user.currentUser }))(BaseView)
