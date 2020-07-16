import { Button, Input, Select, Upload, Form, message, Modal } from 'antd'
import { FormOutlined, UploadOutlined } from '@ant-design/icons'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import React, { Component } from 'react'
import { connect } from 'dva'
import GeographicView from './GeographicView'
import { messageShow } from '@/utils/utils'
import PhoneView from './PhoneView'
import styles from './BaseView.less'

const { Option } = Select // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar}>
      <img src={avatar} alt='avatar' />
    </div>
    <Upload showUploadList={false}>
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
  const values = value.split('-')
  if (!values[0]) {
    callback('Please input your area code!')
  }
  if (!values[1]) {
    callback('Please input your phone number!')
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
      modVisible: false,
    }
  }
  getAvatarURL() {
    const { currentUser } = this.props
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar
      }
      const url =
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
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
        value: 0,
      },
      {
        name: '美国',
        value: 1,
      },
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
        id: 'account.basic.update.success',
      })
    )
  }
  handleModinfo(key) {
    const { currentUser } = this.props
    console.log(key)
    this.setState({
      modText: currentUser[key],
      modTitle: `修改${key}`,
      modVisible: true,
      modKey: key,
    })
  }
  handleOk = (e) => {
    // console.log(this.props.request)
    const { modKey, modText } = this.state
    let param = { id: window.localStorage.getItem('id') || '' }
    param[modKey] = modText
    this.props
      .request('/v1/user/updateMerchant', {
        method: 'POST',
        data: param,
      })
      .then((res) => {
        messageShow(res)
      })
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
    const { value } = e.target
    this.setState({
      modText: value,
    })
  }
  render() {
    const { currentUser } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout='vertical'
            // onFinish={this.handleFinish}
            initialvalues={currentUser}
            hideRequiredMark>
            <Form.Item name='email' label='email'>
              {getFieldDecorator('email', {
                initialValue: currentUser.email,
                rules: [
                  {
                    required: true,
                    message: 'email is required',
                  },
                ],
              })(
                <Input
                  placeholder='email is required'
                  disabled
                  addonAfter={
                    <FormOutlined
                      onClick={this.handleModinfo.bind(this, 'email')}
                    />
                  }
                />
              )}
            </Form.Item>
            <Form.Item name='name' label='name'>
              {getFieldDecorator('name', {
                initialValue: currentUser.name,
                rules: [
                  {
                    required: true,
                    message: 'name is required',
                  },
                ],
              })(
                <Input
                  placeholder='name is required'
                  disabled
                  addonAfter={
                    <FormOutlined
                      onClick={this.handleModinfo.bind(this, 'name')}
                    />
                  }
                />
              )}
            </Form.Item>
            <Form.Item name='nickname' label='nickname'>
              {getFieldDecorator('nickname', {
                initialValue: currentUser.nickname,
                rules: [
                  {
                    required: true,
                    message: 'nickname is required',
                  },
                ],
              })(
                <Input
                  placeholder='nickname is required'
                  disabled
                  addonAfter={
                    <FormOutlined
                      onClick={this.handleModinfo.bind(this, 'nickname')}
                    />
                  }
                />
              )}
            </Form.Item>
            <Form.Item name='countryId' label='country'>
              <Select value={currentUser.countryId}>{this.setOptions()}</Select>
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
              name='address'
              label={formatMessage({
                id: 'account.basic.address',
              })}>
              {getFieldDecorator('address', {
                initialValue: currentUser.address,
              })(
                <Input
                  placeholder='input your address'
                  disabled
                  addonAfter={
                    <FormOutlined
                      onClick={this.handleModinfo.bind(this, 'address')}
                    />
                  }
                />
              )}
            </Form.Item>
            <Form.Item
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
            </Form.Item>
            <Form.Item name='profile' label='profile'>
              {getFieldDecorator('profile', {
                initialValue: currentUser.profile,
                rules: [
                  {
                    required: true,
                    message: 'input your profile',
                  },
                ],
              })(
                <Input.TextArea
                  placeholder='account.basic.profile-placeholder'
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
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
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
      </div>
    )
  }
}
const BaseView = Form.create({ name: 'currentUser' })(BaseAcount)
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(BaseView)
