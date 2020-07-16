// import { Content } from "@ant-design/pro-layout";
import React, { useState, useEffect } from 'react'
import { Spin, Modal } from 'antd'
import { connect } from 'dva'
// import BillListCo from './components/BillList'
import Repertory from './components/Repertory'
import ShopList from './components/ShopList'
import CreatShop from './components/CreatShop'
import EditPic from '@/components/EditPic'
import styles from './index.less'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homeData: {},
      editPicShow: false,
      creatShopVisible: false,
      isShopEdit: false,
    }
  }
  reqRef = 0
  componentDidMount() {
    const { dispatch } = this.props
    if (dispatch) {
      // dispatch({
      //   type: 'shop/fetch',
      //   payload: { id: window.localStorage.getItem('shopId') },
      // })
      this.getShopList()
      this.loadHomeSum()
    }
    /* 比较实用的定时任务方法 */
    // this.reqRef = requestAnimationFrame(() => {
    //   dispatch({
    //     type: 'home/fetch',
    //   });
    // });
    // if (dispatch) {
    //   dispatch({
    //     type: "home/getBills"
    //   });
    //   dispatch({
    //     type: "home/getRepertory"
    //   });
    // }
  }
  getShopList() {
    const { dispatch } = this.props
    if (dispatch) {
      dispatch({
        type: 'shop/fetchShops',
        payload: { id: window.localStorage.getItem('id') },
      })
    }
  }
  loadHomeSum() {
    const { dispatch } = this.props
    if (dispatch) {
      dispatch({
        type: 'home/fetch',
      })
    }
  }
  productsMore() {
    const { dispatch } = this.props
    dispatch({
      type: 'home/getRepertory',
    })
  }
  setImageList(data) {
    const { dispatch } = this.props
    dispatch({
      type: 'commodity/saveFileList',
      payload: data,
    })
    this.setState({
      editPicShow: true,
    })
  }
  handleOk = (e) => {
    const { fileList } = this.props.commodity
    console.log(fileList)
    this.setState({
      editPicShow: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      editPicShow: false,
    })
  }
  handleCreatVisible(visible, isEdit) {
    this.setState({
      creatShopVisible: visible,
    })
    if (isEdit) {
      this.setState({
        isShopEdit: false,
      })
    } else {
      this.setState({
        isShopEdit: true,
      })
    }
  }
  handleCreatShop(value) {
    console.log(value)
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef)
    // clearTimeout(this.timeoutId);
  }
  creatLeft(data, type, unit) {
    if (data) {
      const listItems = data.map((item, i) => {
        if (type == 1) {
          return (
            <li key={i}>
              <p>{item.name}</p>
              <p>
                <span>{unit}</span>
                {item.val}
              </p>
            </li>
          )
        } else {
          return (
            <li key={i}>
              <p>{item.name}</p>
              <p>
                {item.val}
                <span>{unit}</span>
              </p>
            </li>
          )
        }
      })
      return <ul>{listItems}</ul>
    }
  }
  render() {
    const {
      home,
      shop,
      shopsListLoading,
      productsListLoading,
      ProductsList,
      dispatch,
    } = this.props
    const { sumMoney, sumBills } = home
    const { shopsList } = shop
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
        <div className={styles.spin}>
          <Spin spinning={shopsListLoading} size='large'></Spin>
        </div>
        <Modal
          title='编辑商品图片'
          className={styles.standardListForm}
          width={660}
          destroyOnClose
          visible={this.state.editPicShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <EditPic />
        </Modal>
        <ShopList
          shopsList={shopsList}
          creatShop={this.handleCreatVisible.bind(this)}
          updateShop={this.handleCreatVisible.bind(this)}
          dispatch={dispatch}
        />
        <Repertory
          title='我的库存'
          loading={productsListLoading}
          loadMore={this.productsMore.bind(this)}
          setImageList={this.setImageList.bind(this)}
          list={ProductsList}
        />
        <CreatShop
          creatShopVisible={this.state.creatShopVisible}
          isShopEdit={this.state.isShopEdit}
          handleCreatVisible={this.handleCreatVisible.bind(this)}
          updateShops={this.getShopList.bind(this)}
        />
      </div>
    )
  }
}
export default connect(({ home, shop, commodity, loading }) => ({
  home,
  shop,
  commodity,
  shopsListLoading: loading.effects['shop/fetchShops'],
  loading: loading.effects['home/fetch'],
  billLoading: loading.effects['home/getBills'],
  productsListLoading: loading.effects['home/getRepertory'],
}))(Home)
