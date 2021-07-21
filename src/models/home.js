import { getSaleInfo, getRepertory, getHomeBills } from '@/services/home'
const HomeModel = {
  namespace: 'home',
  state: {
    sumMoney: [],
    sumBills: [],
    BillList: [],
    ProductsList: []
  },
  effects: {
    *fetch (_, { call, put }) {
      const response = yield call(getSaleInfo)
      yield put({
        type: 'save',
        payload: response.data
      })
    },
    *getBills ({ payload }, { call, put }) {
      const billList = yield call(getHomeBills)
      yield put({
        type: 'updataBillList',
        payload: billList.BillList
      })
    },
    *getRepertory ({ payload }, { call, put }) {
      const productList = yield call(getRepertory)
      yield put({
        type: 'updataRepertory',
        payload: productList.ProductList
      })
    }
  },
  reducers: {
    save (state, { payload }) {
      return {
        ...state,
        sumMoney: payload.sumMoney,
        sumBills: payload.sumBills
      }
    },
    updataBillList (state, { payload }) {
      return {
        ...state,
        BillList: [...state.BillList, ...payload]
      }
    },
    updataRepertory (state, { payload }) {
      return {
        ...state,
        ProductsList: [...state.ProductsList, ...payload]
      }
    }
  }
}
export default HomeModel
