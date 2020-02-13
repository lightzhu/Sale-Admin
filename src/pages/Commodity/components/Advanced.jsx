import { Form, Alert, Button, Icon, Divider, Upload, Input, Modal, Checkbox } from 'antd';
import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Advanced = props => {
  const { form, fileList, dispatch, submitting } = props;
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState('');
  const [checkedList, setcheckedList] = useState(['Apple']);
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  // if (!data) {
  //   return null;
  // }
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'commodity/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'commodity/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'commodity/submitStepForm',
            payload: { ...data, ...values },
          });
        }
      }
    });
  };
  const handleCancel = () => setpreviewVisible(false);
  const handlePreview = async file => {
    console.log(file)
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
  const checkBoxChange = (value) => {
    console.log(value)
    setcheckedList(value)
  };
  return (
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
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item {...formItemLayout} label="变体" required={false}>
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={checkBoxChange}
        />
      </Form.Item>
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
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ commodity, loading }) => ({
  submitting: loading.effects['commodity/submitStepForm'],
  fileList: commodity.fileList,
}))(Form.create()(Advanced));
