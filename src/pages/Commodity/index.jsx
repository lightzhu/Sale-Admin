import { Card, Steps } from 'antd'
import React, { Component } from 'react'
import { connect } from 'dva'
import Step1 from './components/BasicInfo'
import Step2 from './components/Advanced'
import Step3 from './components/Complete'
import styles from './style.less'
const { Step } = Steps

class Commodity extends Component {
  state = {}
  getCurrentStep() {
    const { current } = this.props
    switch (current) {
      case 'info':
        return 0
      case 'advance':
        return 1
      case 'result':
        return 2
      default:
        return 0
    }
  }
  componentDidMount() {
    const { shopsList, dispatch } = this.props
    if (!shopsList.length) {
      dispatch({
        type: 'shop/fetchShops',
        payload: { id: window.sessionStorage.getItem('id') }
      })
    }
  }
  render() {
    const currentStep = this.getCurrentStep()
    let stepComponent
    if (currentStep === 1) {
      stepComponent = <Step2 />
    } else if (currentStep === 2) {
      stepComponent = <Step3 />
    } else {
      stepComponent = <Step1 />
    }
    return (
      <div>
        <Card bordered={false}>
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="填写基本信息" />
              <Step title="填写更多信息" />
              <Step title="完成" />
            </Steps>
            {stepComponent}
          </>
        </Card>
      </div>
    )
  }
}

export default connect(({ commodity, shop }) => ({
  shopsList: shop.shopsList,
  current: commodity.current
}))(Commodity)
