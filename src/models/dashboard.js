import { fakeChartData } from '@/services/dashboard'
const initState = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: []
}
const Model = {
  namespace: 'dashboard',
  state: initState,
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData)
      yield put({
        type: 'save',
        payload: response
      })
    },

    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData)
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },

    clear() {
      return initState
    }
  }
}
export default Model
