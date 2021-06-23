import React from 'react'
import { Input } from 'antd'
// import { FormOutlined } from '@ant-design/icons'
import styles from './PhoneView.less'

const PhoneView = props => {
  const { value, onChange } = props
  // let values = ['', '']
  // if (value) {
  //   values = value.value.split('-')
  // }
  return (
    <>
      {/* <Input
        className={styles.area_code}
        value={values[0]}
        onChange={e => {
          if (onChange) {
            onChange(`${e.target.value}-${values[1]}`)
          }
        }}
      /> */}
      <Input
        className={styles.phone_number}
        onChange={e => {
          if (onChange) {
            onChange(e.target.value)
          }
        }}
        value={value}
      />
    </>
  )
}

export default PhoneView
