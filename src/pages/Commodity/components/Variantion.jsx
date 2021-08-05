import React from 'react'
import { Table, Input, Button, Popconfirm, Form } from 'antd'
import { connect } from 'dva'
import styles from './index.less'
import { cloneDeep } from 'lodash'
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)
const EditableFormRow = Form.create()(EditableRow)
class EditableCell extends React.Component {
  state = {
    editing: true
  }
  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState(
      {
        editing
      },
      () => {
        if (editing) {
          this.input.focus()
        }
      }
    )
  }
  save = (e) => {
    const { record, handleSave } = this.props
    console.log(e.currentTarget.name)
    this.form.validateFields([e.currentTarget.name], (error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      // this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }
  isNumber = (rule, value, callback) => {
    if (!/^[1-9]\d*$/.test(value)) {
      callback('必须为数字')
    }
    callback()
  }
  renderCell = (form) => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
      >
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            },
            {
              validator: dataIndex != 'name' ? this.isNumber : null
            }
          ],
          initialValue: record[dataIndex]
        })(<Input ref={(node) => (this.input = node)} name={dataIndex} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const { editable, dataIndex, title, record, index, handleSave, children, ...restProps } = this.props
    return <td {...restProps}>{editable ? <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer> : children}</td>
  }
}

class Variantion extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '规格名称',
        dataIndex: 'name',
        width: '30%',
        editable: true
      },
      {
        title: 'price',
        dataIndex: 'price',
        editable: true
      },
      {
        title: 'count',
        dataIndex: 'count',
        editable: true
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null
      }
    ]
    const { product, spec_goods } = this.props
    this.state = {
      dataSource: spec_goods
        ? cloneDeep(spec_goods)
        : product.spec_goods || [
            {
              key: '0',
              name: '',
              price: '9999',
              count: '10'
            }
          ],
      key: product.spec_goods.length ? product.spec_goods[product.spec_goods.length - 1].key + 1 : 1
    }
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource]
    this.setState(
      {
        dataSource: dataSource.filter((item) => item.key !== key)
      },
      () => {
        // 保存变体数据
        this.props.dispatch({
          type: 'commodity/saveVariantion',
          payload: this.state.dataSource
        })
      }
    )
  }

  handleAdd = () => {
    const { key, dataSource } = this.state
    const newData = {
      key: key,
      name: '',
      price: '',
      count: ''
    }
    this.setState({
      dataSource: [...dataSource, newData],
      key: key + 1
    })
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    this.setState({
      dataSource: newData
    })
    // 保存变体数据
    console.log(row)
    if (row.name && row.price && row.count) {
      this.props.dispatch({
        type: 'commodity/saveVariantion',
        payload: newData
      })
    }
  }
  handleConfirm = () => {
    // const { dispatch, product } = this.props
    // dispatch({
    //   type: 'commodity/submitAdvanceInfo',
    //   payload: { productId: product._id, spec_goods: this.state.dataSource }
    // })
  }
  footer() {
    return (
      <>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
            margin: 0
          }}
        >
          新增
        </Button>
      </>
    )
  }
  render() {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      }
    })
    return (
      <div className={styles.container}>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          footer={() => this.footer()}
        />
      </div>
    )
  }
}
export default connect(({ commodity }) => ({
  product: commodity.product
}))(Variantion)
