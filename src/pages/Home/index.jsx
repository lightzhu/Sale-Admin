// import { Content } from "@ant-design/pro-layout";
import React, { useState, useEffect } from 'react';
import { Spin, Row, Col } from 'antd';
import { connect } from 'dva';
import BillListCo from './components/BillList';
import Repertory from './components/Repertory';
import styles from './index.less';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homeData: {},
      billLoading: false
    }
  }
  reqRef = 0;
  componentDidMount() {
    const { dispatch } = this.props;
    /* 比较实用的定时任务方法 */
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'home/fetch',
      });
    });
    if (dispatch) {
      dispatch({
        type: "home/getBills"
      });
      dispatch({
        type: "home/getRepertory"
      });
    }
  }
  loadMoreBills() {
    const { dispatch } = this.props;
    dispatch({
      type: "home/getBills"
    });
  }
  productsMore() {
    const { dispatch } = this.props;
    dispatch({
      type: "home/getRepertory"
    });
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
    // clearTimeout(this.timeoutId);
  }
  creatLeft(data, type, unit) {
    if (data) {
      const listItems = data.map((item, i) => {
        if (type == 1) {
          return (<li key={i}><p>{item.name}</p><p><span>{unit}</span>{item.val}</p></li>)
        } else {
          return (<li key={i}><p>{item.name}</p><p>{item.val}<span>{unit}</span></p></li>)
        }
      })
      return (
        <ul>{listItems}</ul>
      );
    }
  }
  render() {
    const { loading, home, billLoading, productsListLoading } = this.props;
    const { sumMoney, sumBills, BillList, ProductsList } = home
    console.log(home)
    return (
      <div className={styles.main}>
        <div className={styles.sumtop}>
          <h5>销售业绩一览</h5>
          <div className={styles.sumcontent}>
            <div className={styles.topleft}>
              {this.creatLeft(sumMoney, '1', '$')}
            </div>
            <div className={styles.topright}>
              {this.creatLeft(sumBills, '2', '单')}
            </div>
          </div>
        </div>
        <BillListCo title="我的订单" loading={billLoading} loadMore={this.loadMoreBills.bind(this)} list={BillList} />
        <Repertory title="我的库存" loading={productsListLoading} loadMore={this.productsMore.bind(this)} list={ProductsList} />
        <Spin spinning={loading} size="large"></Spin>
      </div>
    );
  }
}
export default connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/fetch'],
  billLoading: loading.effects['home/getBills'],
  productsListLoading: loading.effects['home/getRepertory']
}))(Home);
