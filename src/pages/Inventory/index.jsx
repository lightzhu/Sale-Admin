import { Button, Divider, Dropdown, Radio, message, Form } from 'antd';
import React from 'react';
import UpdateForm from './components/UpdateForm';
import SaTable from './components/SaTable';
import { queryTable, updateRule, addRule, removeRule } from './service';
import styles from './index.less';

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

class TableList extends React.Component {
  state = {
    updateModalVisible: false,
    stepFormValues: {},
    tableData: [],
    checkValue: 0, // 0:全部  1:在售  2:不可售
  }
  handleUpdateModalVisible(boolean) {
    this.setState({
      updateModalVisible: boolean
    })
  }
  setStepFormValues(row) {
    console.log(row)
    this.setState({
      stepFormValues: row
    })
  }
  updateRowStatus(data) {
    this.setState({
      tableData: data.data
    })
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      checkValue: e.target.value,
    });
  };

  componentDidMount() {
    queryTable().then((data) => {
      console.log(data)
      this.setState({
        tableData: data.data
      })
    })
  }
  render() {
    const { stepFormValues, updateModalVisible } = this.state
    return (
      <>
        <div className={styles.checkbox}>
          <span className={styles.label}>商品状态:</span>
          <Radio.Group onChange={this.onChange} value={this.state.checkValue}>
            <Radio value={0}>全部</Radio>
            <Radio value={1}>在售</Radio>
            <Radio value={2}>不可售</Radio>
          </Radio.Group>
        </div>
        <SaTable
          tableData={this.state.tableData}
          updateModalVisible={this.handleUpdateModalVisible.bind(this)}
          setStepFormValues={this.setStepFormValues.bind(this)}
          updateRowStatus={this.updateRowStatus.bind(this)}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async value => {
              const success = await handleUpdate(value);
              if (success) {
                handleModalVisible(false);
                setStepFormValues({});

                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              this.handleUpdateModalVisible(false);
              this.setStepFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </>
    );
  }

};

export default Form.create()(TableList);
// export default connect(({ home, loading }) => ({
//   home,
//   loading: loading.effects['home/fetch'],
// }))(TableList);