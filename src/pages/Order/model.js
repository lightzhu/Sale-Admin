import { addFakeList, queryOrderList, removeFakeList, updateFakeList, queryRefundList, queryRefundCondition } from './service'

const Model = {
  namespace: 'order',
  state: {
    list: [],
    refund: [],
    totalSize: 0
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload)
      yield put({
        type: 'queryList',
        payload: response
      })
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload)
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : []
      })
    },

    *submit({ payload }, { call, put }) {
      let callback
      if (payload.id) {
        callback =
          Object.keys(payload).length === 1 ? removeFakeList : updateFakeList
      } else {
        callback = addFakeList
      }
      const response = yield call(callback, payload)
      yield put({
        type: 'queryList',
        payload: response
      })
    },
    *fetchRefundList({ payload }, { call, put }) {
      const response = yield call(queryRefundList, payload)
      yield put({
        type: 'updateRefundList',
        payload: response
      })
    },
    *fetchRefundCondition({ payload }, { call, put }) {
      const response = yield call(queryRefundCondition, payload)
      yield put({
        type: 'updateRefundList',
        payload: response
      })
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload.data }
    },
    appendList(state = { list: [] }, action) {
      return { ...state, list: state.list.concat(action.payload) }
    },
    updateRefundList(state = { refund: [] }, action) {
      action.payload.data.forEach((item) => {
        item['description'] = `${item['description']};卖家地址:${item.address}。`
      })
      return { ...state, totalSize: action.payload.total, refund: action.payload.data }
    }
  }
}
export default Model
