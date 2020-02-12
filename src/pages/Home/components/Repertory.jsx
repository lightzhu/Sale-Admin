import { List, Avatar, Button, Skeleton, Popover } from 'antd';
import React from 'react';
import { Link } from "umi";
import styles from './style.less';

const setColor = (No) => 'status' + No;
const Repertory = ({ title, list, loading, loadMore }) => {
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
  const content = (
    <div className="tools">
      <Button size="small" block>管理图片</Button>
      <Button size="small" block>删除商品</Button>
      <Button size="small" block type="danger">停售商品</Button>
    </div>
  );
  return (
    <div className={styles.listBox}>
      <div className={styles.head}>
        <h5>{title}</h5>
        <Link to="/welcome"><Button type="primary">上架商品</Button></Link>
      </div>
      <List
        className={[styles.list, 'felx-list']}
        loading={loading}
        itemLayout="horizontal"
        loadMore={billsMore(loading)}
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<Popover content={content}><a key="list-loadmore-edit">edit</a></Popover>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size="large" src={item.proImg} />
                }
                title={<a href="https://i.ebayimg.com/thumbs/images/g/yc4AAOSwQN5ag2m8/s-l225.webp">{item.product}</a>}
              />
              <div className={styles.content}>
                <span className={styles.amount}>{item.amount} 件</span>
                <span className={styles.status}>({item.specification})</span>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
};

export default Repertory;
