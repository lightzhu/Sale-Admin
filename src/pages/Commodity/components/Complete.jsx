import { Button, Result, Descriptions, Statistic } from 'antd'
import React from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import styles from './index.less'

const Complete = (props) => {
  const { data, dispatch } = props

  if (!data) {
    return null
  }

  const { title, stock, spec_goods, description } = data

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'commodity/saveCurrentStep',
        payload: 'info'
      })
    }
  }
  const creatGuigeList = (list) => {
    return list.map((item) => {
      return (
        <p key={item._id}>
          规格：{item.name} 数量：{item.count} 价格：￥{item.price}
        </p>
      )
    })
  }
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="商品名称"> {title}</Descriptions.Item>
        <Descriptions.Item label="上架数量"> {stock}</Descriptions.Item>
        <Descriptions.Item label="商品规格"> {creatGuigeList(spec_goods)}</Descriptions.Item>
        <Descriptions.Item label="商品描述">
          <Statistic value={description} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        新增一条
      </Button>
      <Link to="/commodity/inventory">
        <Button>查看库存</Button>
      </Link>
    </>
  )
  return (
    <Result
      status="success"
      title="操作成功"
      // subTitle="预计两小时内到账"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  )
}

export default connect(({ commodity }) => ({
  data: commodity.product
}))(Complete)
