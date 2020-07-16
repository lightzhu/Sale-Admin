import { Row, Col, Card, Avatar, Button } from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import React from 'react'
import styles from './style.less'
const { Meta } = Card

const ShopList = ({ shopsList, creatShop, updateShop, dispatch }) => {
  return (
    <div className={styles.cardList}>
      <Row type='flex' justify='space-between'>
        <Col span={11}>
          <Button
            type='dashed'
            className={styles.newButton}
            onClick={() => {
              // dispatch({ type: 'shop/clean' })
              creatShop(true)
            }}>
            <PlusOutlined /> 新增店铺
          </Button>
        </Col>
        {shopsList.map((shop, index) => {
          return (
            <Col span={index % 2 ? 11 : 12} key={index}>
              <Card
                actions={[
                  <SettingOutlined key='setting' />,
                  <EditOutlined
                    key='edit'
                    onClick={() => {
                      dispatch({
                        type: 'shop/fetch',
                        payload: { id: shop.id },
                      })
                      updateShop(true, true)
                    }}
                  />,
                  <EllipsisOutlined key='ellipsis' />,
                ]}>
                <Meta
                  avatar={
                    <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                  }
                  title={shop.name}
                  description={shop.shopDesc}
                />
                <ul className={styles.shopBill}>
                  <li>
                    <span>今日订单</span>
                    <span>{shop.dayBill}</span>
                  </li>
                  <li>
                    <span>本周订单</span>
                    <span>{shop.weekBill}</span>
                  </li>
                  <li>
                    <span>本月订单</span>
                    <span>{shop.monthBill}</span>
                  </li>
                  <li>
                    <span>本月营业额</span>
                    <span>{shop.monthCount}</span>
                  </li>
                </ul>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default ShopList
