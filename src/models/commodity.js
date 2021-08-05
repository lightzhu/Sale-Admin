import { submitAdvanceInfo, submitBasicInfo } from '@/services/product'
import { message } from "antd";
const CommodityModel = {
  namespace: 'commodity',
  state: {
    current: 'info',
    variantion: [],// 变体
    product: {
      shop_id: '',
      title: '',
      sub_title: '',
      stock: '',
      category_id: '',
      pay_type: ['支付宝'],
      return_desc: '不支持无理由退货！',
      description: '',
      image_list: [],
      spec_goods: []
    },
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url:
      //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      // }
    ]
  },
  effects: {
    *saveBasicInfo ({ payload }, { call, put }) {
      const response = yield call(submitBasicInfo, payload)
      if (response.status == 1) {
        yield put({
          type: 'saveStepFormData',
          payload: response.data
        })
        yield put({
          type: 'saveCurrentStep',
          payload: 'advance'
        })
      } else {
        // console.log(response)
        message.warn(response.message)
      }
    },
    *submitAdvanceInfo ({ payload }, { call, put }) {
      console.log(payload)
      const response = yield call(submitAdvanceInfo, payload)
      if (response.status == 1) {
        yield put({
          type: 'saveStepFormData',
          payload: response.data
        })
        yield put({
          type: 'saveCurrentStep',
          payload: 'result'
        })
      } else {
        message.warn(response.message)
      }
    }
  },
  reducers: {
    saveCurrentStep (state, { payload }) {
      return { ...state, current: payload }
    },
    saveStepFormData (state, { payload }) {
      return { ...state, product: { ...payload } }
    },
    saveFileList (state, { payload }) {
      return { ...state, fileList: [...payload] }
    },
    saveVariantion (state, { payload }) {
      return { ...state, variantion: [...payload] }
    }
  }
}
export default CommodityModel
