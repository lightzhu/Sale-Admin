import {
  Form,
  Alert,
  Button,
  Icon,
  Divider,
  Upload,
  Input,
  Modal,
  message
} from 'antd'
import React, { useState } from 'react'
import { connect } from 'dva'
import request from '@/utils/request'
import Variantion from './Variantion'
import styles from './index.less'
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
}

const Advanced = props => {
  const { form, product, fileList, dispatch, submitting } = props
  const [previewVisible, setpreviewVisible] = useState(false)
  const [previewImage, setpreviewImage] = useState('')
  // const [checkedList, setcheckedList] = useState(['Apple'])

  const { getFieldDecorator, validateFields, getFieldsValue } = form

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
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

  const onValidateForm = e => {
    // 表单提交，获取表单数据进行更新
    console.log(getFieldsValue())
    //执行上传图片操作
    handleUpload(fileList)
    e.preventDefault()
    if (dispatch) {
      dispatch({
        type: 'commodity/submitStepForm',
        payload: { current: 'confirm' }
      })
    }
  }
  const handleCancel = () => setpreviewVisible(false)
  const handlePreview = async file => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setpreviewVisible(true)
    setpreviewImage(file.url || file.preview)
  }
  // 上传图片
  const handleUpload = async fileList => {
    // 图片列表
    console.log(fileList)
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append('files[]', file)
    })
    request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      data: formData
    })
      .then(res => {
        console.log(res)
        message.success('upload successfully.')
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  const uploadButton = (
    <div>
      <Icon type='plus' />
      <div className='ant-upload-text'>Upload</div>
    </div>
  )
  const handleChange = obj => {
    console.log(obj)
    if (dispatch) {
      dispatch({
        type: 'commodity/saveFileList',
        payload: obj.fileList
      })
    }
  }
  return (
    <Form layout='horizontal' name='form_more' className={styles.stepForm}>
      <Alert
        closable
        showIcon
        message='最多只能上传5张照片,包括产品主图、尺寸图及规格图。'
        style={{
          marginBottom: 24
        }}
      />
      <div className='clearfix'>
        <Upload
          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType='picture-card'
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}>
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      <Divider
        style={{
          margin: '24px 0'
        }}
      />
      <Variantion></Variantion>
      <Form.Item
        style={{
          marginBottom: 8
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 8
          }
        }}
        label=''>
        <Button type='primary' onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8
          }}>
          上一步
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({ commodity, loading }) => ({
  submitting: loading.effects['commodity/submitStepForm'],
  fileList: commodity.fileList,
  product: commodity.product
}))(Form.create()(Advanced))
