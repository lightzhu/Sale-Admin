import { Form, Alert, Button, Icon, Upload, Modal } from 'antd';
import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const EditPic = props => {
  const { fileList, dispatch } = props;
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState('');
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const handleCancel = () => setpreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setpreviewVisible(true)
    setpreviewImage(file.url || file.preview)
  };
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const handleChange = (obj) => {
    console.log(obj);
    if (dispatch) {
      dispatch({
        type: 'commodity/saveFileList',
        payload: obj.fileList,
      });
    }
  }
  return (
    <>
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="最多只能上传5张照片,包括产品主图、尺寸图及规格图。"
          style={{
            marginBottom: 24,
          }}
        />
        <div className="clearfix">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <Form.Item
          style={{
            marginBottom: 8,
          }}
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(({ commodity }) => ({
  fileList: commodity.fileList,
}))(EditPic);
