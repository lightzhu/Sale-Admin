import { Button, Divider, Dropdown, Radio, message, Form, Table } from 'antd'
import React, { useState, useRef } from 'react'
import { updateRule, disableShop, removeProduct } from '../service'
import styles from '../index.less'
const noImage = require('@/assets/img/no-image.png')
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
        key: selectedRows.key
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
        key: selectedRows.key
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
      dataIndex: 'title'
    },
    {
      title: '图片',
      dataIndex: 'image_list',
      render: (_, record) => (
        <>
          {record.image_list.length ? (
            <img
              src={record.image_list[0] ? record.image_list[0] : noImage}
              style={{
                width: '40px',
                height: '26px'
              }}
            ></img>
          ) : (
            <img
              src={noImage}
              style={{
                width: '40px',
                height: '26px'
              }}
            ></img>
          )}
        </>
      )
    },
    {
      title: '可售数量',
      // dataIndex: 'availableNo'
      render: (_, record) => {
        return record.sale_count ? record.stock - record.sale_count : record.stock - 0
      }
    },
    {
      title: '销量',
      dataIndex: 'sale_count',
      sorter: true,
      render: (_, record) => {
        return record.sale_count ? record.sale_count : 0
      }
    },
    {
      title: '上架数量',
      dataIndex: 'stock'
      // sorter: true,
    },
    {
      title: '规格&价格',
      dataIndex: 'spec_goods',
      render: (_, record) => {
        return '暂无'
        // return record.spec_goods ? record.spec_goods : '暂无'
      }
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
          text = '已下架'
        }
        return text
      }
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      valueType: 'dateTime'
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
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              unSold(record)
            }}
          >
            停售
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              deleSold(record)
            }}
          >
            删除商品
          </a>
        </>
      )
    }
  ]
  const { tableData, pagination } = props
  return (
    <>
      <Table
        className={styles.mainTable}
        columns={columns}
        dataSource={tableData}
        pagination={pagination}
        size="small"
        rowKey={() => Math.random(100)}
        bordered
      />
    </>
  )
}

export default SaTable
