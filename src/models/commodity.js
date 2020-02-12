import { fakeSubmitForm } from '@/services'
const CommodityModel = {
  namespace: 'commodity',
  state: {
    current: 'info',
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500'
    }
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
      return { ...state, step: { ...state.step, ...payload } }
    }
  }
}
export default CommodityModel
