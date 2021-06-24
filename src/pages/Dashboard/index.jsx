import { EllipsisOutlined } from '@ant-design/icons'
import { Col, Dropdown, Menu, Row } from 'antd'
import React, { Component, Suspense } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { connect } from 'dva'
import PageLoading from './components/PageLoading'
import { getTimeDistance } from './utils/utils'
import styles from './style.less'

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'))
const SalesCard = React.lazy(() => import('./components/SalesCard'))
const TopSearch = React.lazy(() => import('./components/TopSearch'))
const ProportionSales = React.lazy(() => import('./components/ProportionSales'))

class Dashboard extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year')
  }

  reqRef = 0

  timeoutId = 0

  componentDidMount() {
    const { dispatch } = this.props
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboard/fetch'
      })
    })
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'dashboard/clear',
    // });
    cancelAnimationFrame(this.reqRef)
    clearTimeout(this.timeoutId)
  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value
    })
  }

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key
    })
  }

  handleRangePickerChange = (rangePickerValue) => {
    const { dispatch } = this.props
    this.setState({
      rangePickerValue
    })
    dispatch({
      type: 'dashboard/fetchSalesData'
    })
  }

  selectDate = (type) => {
    const { dispatch } = this.props
    this.setState({
      rangePickerValue: getTimeDistance(type)
    })
    dispatch({
      type: 'dashboard/fetchSalesData'
    })
  }

  isActive = (type) => {
    const { rangePickerValue } = this.state
    const value = getTimeDistance(type)

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return ''
    }

    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate
    }

    return ''
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state
    const { dashboard, loading } = this.props
    const { visitData, visitData2, salesData, searchData, salesTypeData, salesTypeDataOnline, salesTypeDataOffline } = dashboard
    let salesPieData

    if (salesType === 'all') {
      salesPieData = salesTypeData
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline
    }

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    )
    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <EllipsisOutlined />
        </Dropdown>
      </span>
    )

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={visitData} />
          </Suspense>
          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch loading={loading} visitData2={visitData2} searchData={searchData} dropdownGroup={dropdownGroup} />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    )
  }
}

export default connect(({ dashboard, loading }) => ({
  dashboard,
  loading: loading.effects['dashboard/fetch']
}))(Dashboard)
