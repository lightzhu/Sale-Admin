import { getSummary } from '@/services/home'
const HomeModel = {
  namespace: 'home',
  state: {
    summary: {}
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getSummary)
      yield put({
        type: 'save',
        payload: response
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
export default HomeModel
