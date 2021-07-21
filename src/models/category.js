import { getCategoryist } from '@/services/category'
const CategoryModel = {
  namespace: 'category',
  state: {
    allCategory: []
  },
  effects: {
    *fetch (_, { call, put }) {
      const response = yield call(getCategoryist)
      yield put({
        type: 'save',
        payload: response
      })
    }
  },
  reducers: {
    save (state, { payload }) {
      return {
        ...state,
        allCategory: payload
      }
    }
  }
}
export default CategoryModel
