import { Table, Input, InputNumber, Popconfirm, Form } from 'antd'
import { query as queryUsers } from '@/services/user'
import styles from '../style.less'

const EditableContext = React.createContext()
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }
  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], editingKey: '' }
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: 'company',
        dataIndex: 'company',
        editable: true,
      },
      {
        title: 'email',
        dataIndex: 'email',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        editable: true,
      },
      {
        title: 'reigster_time',
        dataIndex: 'reigster_time',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state
          const editable = this.isEditing(record)
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {(form) => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}>
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title='Sure to cancel?'
                onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ''}
              onClick={() => this.edit(record.key)}>
              Edit
            </a>
          )
        },
      },
    ]
  }

  isEditing = (record) => record.key === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        this.setState({ data: newData, editingKey: '' })
      } else {
        newData.push(row)
        this.setState({ data: newData, editingKey: '' })
      }
    })
  }

  edit(key) {
    this.setState({ editingKey: key })
  }
  componentDidMount() {
    queryUsers().then((users) => {
      console.log(users)
      this.setState({
        data: users.data,
      })
    })
  }
  render() {
    const components = {
      body: {
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
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      }
    })

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName='editable-row'
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    )
  }
}
export default Form.create()(List)
