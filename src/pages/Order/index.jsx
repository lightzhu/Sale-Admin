import { DownOutlined } from '@ant-design/icons'
import {
  Form,
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Result
} from 'antd'
import React, { Component } from 'react'
import { connect } from 'dva'
// import { findDOMNode } from 'react-dom';
import moment from 'moment'
import styles from './style.less'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const SelectOption = Select.Option
const { Search, TextArea } = Input

class Order extends Component {
  state = {
    visible: false,
    done: false,
    current: undefined,
    expressNum: '',
    expressVisible: false
  }

  formLayout = {
    labelCol: {
      span: 7
    },
    wrapperCol: {
      span: 13
    }
  }

  addBtn = undefined
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'order/fetch',
      payload: {
        count: 5
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined
    })
  }

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item
    })
  }

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0)
    this.setState({
      done: false,
      visible: false
    })
  }

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0)
    this.setState({
      visible: false
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch, form } = this.props
    const { current } = this.state
    const id = current ? current.id : ''
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0)
    form.validateFields((err, fieldsValue) => {
      if (err) return
      this.setState({
        done: true
      })
      dispatch({
        type: 'order/submit',
        payload: {
          id,
          ...fieldsValue
        }
      })
    })
  }

  deleteItem = id => {
    const { dispatch } = this.props
    dispatch({
      type: 'order/submit',
      payload: {
        id
      }
    })
  }
  // 处理输入快递单号相关
  showExpressModal = () => {
    this.setState({
      expressVisible: true,
      expressNum: ''
    })
  }
  handleOk = e => {
    this.setState({
      expressVisible: false
    })
  }

  handleCancel = e => {
    this.setState({
      expressVisible: false
    })
  }
  onChange(value) {
    this.setState({
      expressNum: value
    })
  }
  render() {
    const {
      order: { list },
      loading
    } = this.props
    const {
      form: { getFieldDecorator }
    } = this.props
    console.log(list)
    const { visible, done, current = {}, expressVisible } = this.state

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem)
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除订单',
          content: '确定删除该订单吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id)
        })
      }
    }

    const modalFooter = done
      ? {
          footer: null,
          onCancel: this.handleDone
        }
      : {
          okText: '保存',
          onOk: this.handleSubmit,
          onCancel: this.handleCancel
        }
    // 头部简单统计组件
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    )
    // 订单类型选择
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue='all'>
          <RadioButton value='all'>全部</RadioButton>
          <RadioButton value='progress'>进行中</RadioButton>
          <RadioButton value='waiting'>待发货</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder='请输入'
          onSearch={() => ({})}
        />
      </div>
    )
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 10
    }

    const ListContent = ({
      data: { user, createdAt, status, price, orderNo }
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
          <span>订单编号:{orderNo}</span>
        </div>
        <div className={styles.listContentItem}>
          <p>{user}</p>
          <p>付款金额:{price}</p>
        </div>
        <div className={styles.listContentItem}>
          <p>{status}</p>
        </div>
      </div>
    )

    const MoreBtn = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key='edit'>详情</Menu.Item>
            <Menu.Item key='delete'>删除</Menu.Item>
          </Menu>
        }>
        <a>
          更多 <DownOutlined />
        </a>
      </Dropdown>
    )

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            status='success'
            title='操作成功'
            subTitle='一系列的信息描述，很短同样也可以带标点。'
            extra={
              <Button type='primary' onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        )
      }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='商品名称' {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入商品名称'
                }
              ],
              initialValue: current.title
            })(<Input placeholder='请输入' />)}
          </FormItem>
          <FormItem label='开始时间' {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [
                {
                  required: true,
                  message: '请选择开始时间'
                }
              ],
              initialValue: current.createdAt ? moment(current.createdAt) : null
            })(
              <DatePicker
                showTime
                placeholder='请选择'
                format='YYYY-MM-DD HH:mm:ss'
                style={{
                  width: '100%'
                }}
              />
            )}
          </FormItem>
          <FormItem label='任务负责人' {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [
                {
                  required: true,
                  message: '请选择任务负责人'
                }
              ],
              initialValue: current.owner
            })(
              <Select placeholder='请选择'>
                <SelectOption value='付晓晓'>付晓晓</SelectOption>
                <SelectOption value='周毛毛'>周毛毛</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label='产品描述'>
            {getFieldDecorator('subDescription', {
              rules: [
                {
                  message: '请输入至少五个字符的产品描述！',
                  min: 5
                }
              ],
              initialValue: current.subDescription
            })(<TextArea rows={4} placeholder='请输入至少五个字符' />)}
          </FormItem>
        </Form>
      )
    }

    return (
      <>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title='待发货' value='8个订单' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='进行中订单' value='10个订单' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='本周订单总数' value='28个订单' />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title='我的订单'
            style={{
              marginTop: 24
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px'
            }}
            extra={extraContent}>
            <List
              size='large'
              rowKey='id'
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      key='edit'
                      onClick={e => {
                        e.preventDefault()
                        this.showExpressModal(item)
                      }}>
                      已发货
                    </a>,
                    <MoreBtn key='more' item={item} />
                  ]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.avatar} shape='square' size='large' />
                    }
                    title={<a href={item.href}>{item.title}</a>}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `任务${current ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={
            done
              ? {
                  padding: '72px 0'
                }
              : {
                  padding: '28px 0 0'
                }
          }
          destroyOnClose
          visible={visible}
          {...modalFooter}>
          {getModalContent()}
        </Modal>
        <Modal
          title='输入快递单号'
          visible={expressVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Input placeholder='输入快递单号' onChange={this.onChange} />
        </Modal>
      </>
    )
  }
}

export default connect(({ order, loading }) => ({
  order,
  loading: loading.models.order
}))(Form.create()(Order))
