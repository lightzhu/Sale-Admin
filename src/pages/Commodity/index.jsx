import { Card, Steps } from 'antd'
import React, { Component } from 'react'
import { connect } from 'dva'
import Step1 from './components/BasicInfo'
import Step2 from './components/Advanced'
import Step3 from './components/Complete'
import styles from './style.less'
const { Step } = Steps

class Commodity extends Component {
  state = {
    category: {
      家居园艺: [
        { name: '工艺品', val: '1' },
        { name: '装修', val: '2' },
        { name: '宠物用品', val: '3' },
      ],
      电子产品: [
        { name: '手机、平板', val: '4' },
        { name: '耳机、数据线', val: '5' },
        { name: '电视音响', val: '6' },
      ],
    },
  }

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

  render() {
    const currentStep = this.getCurrentStep()
    let stepComponent

    if (currentStep === 1) {
      stepComponent = <Step2 />
    } else if (currentStep === 2) {
      stepComponent = <Step3 />
    } else {
      stepComponent = <Step1 category={this.state.category} />
    }

    return (
      <div>
        <Card bordered={false}>
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title='填写基本信息' />
              <Step title='填写更多信息' />
              <Step title='完成' />
            </Steps>
            {stepComponent}
          </>
        </Card>
      </div>
    )
  }
}

export default connect(({ commodity }) => ({
  current: commodity.current,
}))(Commodity)
