import { fakeSubmitForm } from '@/services'
const CommodityModel = {
  namespace: 'commodity',
  state: {
    current: 'info',
    step: {
      name: 'Alex',
      amount: '500',
      secCategory: '其他',
      firstCategory: '其他',
      price: '220',
      payType: 'PayPal',
      salesReturn: '支持退货',
      imgList: [],
      describe:
        '全新带盒: A brand-new, unused, and unworn item (including handmade items) in the original packaging (such as the original box or bag) and/or with the original tags attached.'
    },
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url:
          'https://i.ebayimg.com/thumbs/images/g/UlgAAOSwFqJWoSRw/s-l225.webp'
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url:
          'https://i.ebayimg.com/thumbs/images/g/tugAAOSwBahVftdu/s-l225.webp'
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url:
          'https://i.ebayimg.com/thumbs/images/g/7gEAAOSw3xJVftf-/s-l225.webp'
      }
    ]
  },
  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload)
      yield put({
        type: 'saveStepFormData',
        payload
      })
      yield put({
        type: 'saveCurrentStep',
        payload: 'result'
      })
    }
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload }
    },

    saveStepFormData(state, { payload }) {
      return { ...state, ...payload }
    },
    saveFileList(state, { payload }) {
      return { ...state, fileList: [...payload] }
    }
  }
}
export default CommodityModel
