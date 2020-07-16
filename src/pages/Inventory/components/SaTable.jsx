import { Button, Divider, Dropdown, Radio, message, Form, Table } from 'antd'
import React, { useState, useRef } from 'react'
import { updateRule, disableShop, removeProduct } from '../service'
import styles from '../index.less'

/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置')

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    })
    hide()
    message.success('配置成功')
    return true
  } catch (error) {
    hide()
    message.error('配置失败请重试！')
    return false
  }
}

const SaTable = (props) => {
  // const [createModalVisible, handleModalVisible] = useState(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const { updateModalVisible, setStepFormValues, updateRowStatus } = props
  const unSold = async (selectedRows) => {
    console.log(selectedRows)
    const hide = message.loading('正在下架')
    if (!selectedRows) return true
    try {
      let data = await disableShop({
        key: selectedRows.key,
      })
      console.log(data)
      updateRowStatus(data)
      hide()
      message.success('下架成功，即将刷新')
      return true
    } catch (error) {
      hide()
      message.error('下架失败，请重试')
      return false
    }
  }
  const deleSold = async (selectedRows) => {
    console.log(selectedRows)
    const hide = message.loading('正在删除')
    if (!selectedRows) return true
    try {
      let data = await removeProduct({
        key: selectedRows.key,
      })
      updateRowStatus(data)
      hide()
      message.success('删除成功，即将刷新')
      return true
    } catch (error) {
      hide()
      message.error('删除失败，请重试')
      return false
    }
  }
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '图片',
      dataIndex: 'image',
      render: (_, record) => (
        <>
          <img
            src={record.image}
            style={{
              width: '40px',
              height: '26px',
            }}></img>
        </>
      ),
    },
    {
      title: '商品规格',
      dataIndex: 'variant',
      render: (_, record) => {
        return record.variant ? record.variant : '暂无'
      },
    },
    {
      title: '可售数量',
      dataIndex: 'availableNo',
      // renderText: val => `${val} 万`,
    },
    {
      title: '销量',
      dataIndex: 'saleNo',
      sorter: true,
      // renderText: val => `${val} 万`,
    },
    {
      title: '上架数量',
      dataIndex: 'productNo',
      // sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (val) => {
        let text = ''
        if (val == 0) {
          text = '不可售'
        } else if (val == 1) {
          text = '销售中'
        } else {
          text = '缺货'
        }
        return text
      },
    },
    {
      title: '更新时间',
      dataIndex: 'gmtModify',
      valueType: 'dateTime',
    },
    {
      title: '价格($)',
      dataIndex: 'price',
      renderText: (val) => `${val}p`,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              updateModalVisible(true)
              setStepFormValues(record)
            }}>
            编辑
          </a>
          <Divider type='vertical' />
          <a
            onClick={() => {
              unSold(record)
            }}>
            停售
          </a>
          <Divider type='vertical' />
          <a
            onClick={() => {
              deleSold(record)
            }}>
            删除商品
          </a>
        </>
      ),
    },
  ]
  const { tableData } = props
  // state = {
  //   updateModalVisible: false,
  //   stepFormValues: {},
  //   tableData: [],
  //   checkValue: 0, // 0:全部  1:在售  2:不可售
  // }

  return (
    <>
      <Table
        className={styles.mainTable}
        columns={columns}
        dataSource={tableData}
        size='small'
        bordered
      />
    </>
  )
}

export default SaTable
