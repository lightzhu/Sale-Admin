import { Button, Result, Descriptions, Statistic } from 'antd'
import React from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import styles from './index.less'

const Complete = props => {
  const { data, dispatch } = props

  if (!data) {
    return null
  }

  const { name, amount, price, describe } = data

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'commodity/saveCurrentStep',
        payload: 'info'
      })
    }
  }

  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label='商品名称'> {name}</Descriptions.Item>
        <Descriptions.Item label='上架数量'> {amount}</Descriptions.Item>
        <Descriptions.Item label='商品单价'> {price}</Descriptions.Item>
        <Descriptions.Item label='商品描述'>
          <Statistic value={describe} suffix='元' />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
  const extra = (
    <>
      <Button type='primary' onClick={onFinish}>
        新增一条
      </Button>
      <Link to='/inventory'>
        <Button>查看库存</Button>
      </Link>
    </>
  )
  return (
    <Result
      status='success'
      title='操作成功'
      // subTitle="预计两小时内到账"
      extra={extra}
      className={styles.result}>
      {information}
    </Result>
  )
}

export default connect(({ commodity }) => ({
  data: commodity.product
}))(Complete)
