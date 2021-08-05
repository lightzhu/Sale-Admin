import { Button, Divider, Dropdown, Radio, message, Form, Table } from 'antd'
import React, { useState, useRef } from 'react'
import { updateSoldStatus, removeProduct } from '../service'
import moment from 'moment'
import styles from '../index.less'
const noImage = require('@/assets/img/no-image.png')
const SaTable = (props) => {
  const { updateModalVisible, setStepFormValues, updateRowStatus, deleRowItem } = props
  const updateSold = async (selectedRows, type) => {
    const toolType = type == 1 ? '上架' : '下架'
    console.log(selectedRows)
    const hide = message.loading(`正在${toolType}`)
    try {
      let res = await updateSoldStatus({
        _id: selectedRows._id,
        status: type
      })
      console.log(res)
      updateRowStatus(res.data)
      hide()
      return message.success(`${toolType}成功，即将刷新`)
    } catch (error) {
      hide()
      return message.error(`${toolType}失败，请重试`)
    }
  }
  const deleSold = async (selectedRows) => {
    console.log(selectedRows)
    const hide = message.loading('正在删除')
    if (!selectedRows) return true
    try {
      let res = await removeProduct({
        _id: selectedRows._id
      })
      deleRowItem(res.data)
      hide()
      return message.success('删除成功')
    } catch (error) {
      hide()
      return message.error('删除失败，请重试')
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
      render: (_, record) => (
        <>
          {record.spec_goods.length
            ? record.spec_goods.map((item, index) => {
                return (
                  <span className={styles.guige} key={index}>
                    {item.name}: ￥ {item.price}
                  </span>
                )
              })
            : '暂无'}
        </>
      )
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
      render: (_, record) => {
        return moment(record.update_time).format('YYYY-MM-DD HH:mm:ss')
      }
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
          {record.status == 1 ? (
            <a
              className={styles.xiajia}
              onClick={() => {
                updateSold(record, 2)
              }}
            >
              下架
            </a>
          ) : (
            <a
              onClick={() => {
                updateSold(record, 1)
              }}
            >
              上架
            </a>
          )}
          <Divider type="vertical" />
          <a
            className={styles.danger}
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
        rowKey="_id"
        dataSource={tableData}
        pagination={pagination}
        size="small"
        bordered
      />
    </>
  )
}

export default SaTable
