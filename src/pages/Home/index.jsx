// import { Content } from "@ant-design/pro-layout";
import React, { useState, useEffect } from 'react';
import { Spin, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homeData: {}
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
    const { loading, home } = this.props;
    const { sumMoney, bills } = home
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
              {this.creatLeft(bills, '2', '单')}
            </div>
          </div>
        </div>
        <Spin spinning={loading} size="large"></Spin>
      </div>
    );
  }
}
// () => {
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);
// };
export default connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/fetch'],
}))(Home);
