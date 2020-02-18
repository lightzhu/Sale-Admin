import { Button, Divider, Dropdown, Radio, message, Form, Table } from 'antd';
import React, { useState, useRef } from 'react';
import { queryTable, updateRule, addRule, removeRule } from '../service';
import styles from '../index.less';



/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const SaTable = (props) => {
  // const [createModalVisible, handleModalVisible] = useState(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  // const [stepFormValues, setStepFormValues] = useState({});
  const { updateModalVisible, setStepFormValues } = props;
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
          <img src={record.image} style={{
            width: "40px",
            height: "26px"
          }}></img>
        </>
      ),
    },
    {
      title: '可售数量',
      dataIndex: 'callNo',
      sorter: true,
      // renderText: val => `${val} 万`,
    },
    {
      title: '上架数量',
      dataIndex: 'productNo',
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '不可售',
          status: 'Default',
        },
        1: {
          text: '销售中',
          status: 'Processing',
        },
        2: {
          text: '缺货',
          status: 'Error',
        },
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
    },
    {
      title: '价格($)',
      dataIndex: 'price',
      renderText: val => `${val}`,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              updateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">下架</a>
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
        size="small"
        bordered
      />
    </>
  );

};

export default SaTable;