import React from 'react'
import { Table, Input, Button, Popconfirm, Form } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: true,
  }
  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState(
      {
        editing,
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

  renderCell = (form) => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={(node) => (this.input = node)}
            name={dataIndex}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
        }}
        onClick={this.toggleEdit}>
        {children}
      </div>
    )
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

class Variantion extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '规格名称',
        dataIndex: 'variantName',
        width: '30%',
        editable: true,
      },
      {
        title: 'price',
        dataIndex: 'price',
        editable: true,
      },
      {
        title: 'count',
        dataIndex: 'count',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ]
    this.state = {
      dataSource: [
        {
          key: '0',
          variantName: '16G 玫瑰金',
          price: '3200',
          count: '10',
        },
      ],
      count: 1,
    }
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource]
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    })
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      key: count,
      variantName: ``,
      price: '',
      count: '',
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    })
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    this.setState({
      dataSource: newData,
    })
  }
  handleConfirm = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'commodity/saveVariantion',
      payload: this.state.dataSource,
    })
    // console.log(this.state.dataSource)
  }
  footer() {
    return (
      <>
        <Button
          onClick={this.handleAdd}
          type='primary'
          style={{
            marginBottom: 16,
            margin: 0,
          }}>
          新增
        </Button>
        <Button
          onClick={this.handleConfirm}
          type='primary'
          style={{
            marginBottom: 16,
            margin: 0,
          }}>
          确认
        </Button>
      </>
    )
  }
  render() {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
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
          handleSave: this.handleSave,
        }),
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
  product: commodity.variantion,
}))(Variantion)
