import { Form, Alert, Button, Icon, Divider, Upload, Input, Modal, message } from 'antd'
import React, { useState } from 'react'
import { connect } from 'dva'
import request from '@/utils/request'
import Variantion from './Variantion'
import styles from './index.less'

const Advanced = (props) => {
  const { product, variantion, fileList, dispatch, submitting } = props
  const [previewVisible, setpreviewVisible] = useState(false)
  const [previewImage, setpreviewImage] = useState('')

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const onPrev = () => {
    if (dispatch) {
      // dispatch({
      //   type: 'commodity/saveFileList',
      //   payload: { ...data, ...values },
      // });
      dispatch({
        type: 'commodity/saveCurrentStep',
        payload: 'info'
      })
    }
  }

  const onAdvanceSubmit = (e) => {
    if (!variantion.length) {
      return message.warning('请先确认上方商品规格再提交！')
    }
    // 表单提交，获取表单数据进行更新
    const formData = new FormData()
    console.log(fileList)
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj)
    })
    formData.append('productId', product._id)
    formData.append('spec_goods', JSON.stringify(variantion))
    console.log(formData)
    //执行上传图片操作
    // handleUpload(formData)
    e.preventDefault()
    if (dispatch) {
      dispatch({
        type: 'commodity/submitAdvanceInfo',
        payload: formData
      })
    }
  }
  const handleCancel = () => setpreviewVisible(false)
  const handlePreview = async (file) => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setpreviewVisible(true)
    setpreviewImage(file.url || file.preview)
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  const handleChange = (obj) => {
    if (dispatch) {
      dispatch({
        type: 'commodity/saveFileList',
        payload: obj.fileList
      })
    }
  }
  return (
    <Form layout="horizontal" name="form_more" className={styles.stepForm}>
      <Alert
        closable
        showIcon
        message="最多只能上传5张照片,包括产品主图、尺寸图及规格图。"
        style={{
          marginBottom: 24
        }}
      />
      <div className="clearfix">
        <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      <Divider style={{ margin: '24px 0' }} />
      <Variantion></Variantion>
      <Form.Item
        style={{
          marginBottom: 8,
          marginTop: 15
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 8
          }
        }}
        label=""
      >
        <Button onClick={onPrev} style={{ marginRight: 20, width: 100 }}>
          上一步
        </Button>
        <Button type="primary" style={{ width: 100 }} onClick={onAdvanceSubmit} loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({ commodity, loading }) => ({
  submitting: loading.effects['commodity/submitStepForm'],
  fileList: commodity.fileList,
  product: commodity.product,
  variantion: commodity.variantion
}))(Form.create()(Advanced))
