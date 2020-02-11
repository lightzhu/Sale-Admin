import { List, Avatar, Button, Skeleton } from 'antd';
import React from 'react';
import styles from './style.less';

const setColor = (No) => 'status' + No;
const BillList = ({ title, list, loading, loadMore }) => {
  const billsMore = (load) => {
    return (
      !load ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={loadMore}>loading more</Button>
        </div>
      ) : null)
  }
  return (
    <div className={styles.listBox}>
      <h5>{title}</h5>
      <List
        className={[styles.list, 'felx-list']}
        loading={loading}
        itemLayout="horizontal"
        loadMore={billsMore(loading)}
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size="large" src={item.proImg} />
                }
                title={<a href="https://www.ebay.com/b/Fragrances/180345/bn_1853074">{item.product}</a>}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div className={styles.content}>
                <span className={styles.amount}>{item.amount} 件</span>
                <span className={styles.payment}>总付款:$ {item.payment}</span>
                <span className={styles.status, setColor(item.statusNo)}>({item.status})</span>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
};

export default BillList;
