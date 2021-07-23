import { getShopById, getShopList, creatShop } from '@/services/shop'
const ShopModel = {
  namespace: "shop",
  state: {
    shopsList: [],
    shopInfo: {
      name: '',
      address: ['浙江', '杭州', '西湖'],
      phone: '',
      category: 5,
      id: 8,
      description: ''
    }
  },
  effects: {
    *fetch ({ payload }, { call, put }) {
      const response = yield call(getShopById, payload);
      yield put({
        type: "save",
        payload: response.data
      });
    },
    *initShop ({ }, { put }) {
      yield put({
        type: "init",
        payload: {
          name: '',
          address: ['浙江', '杭州', '西湖'],
          phone: '',
          category: 5,
          id: 8,
          description: ''
        }
      })
    },
    * creat ({ payload }, { call, put }) {
      const response = yield call(creatShop, payload);
      yield put({
        type: "creat",
        payload: { merchantId: window.sessionStorage.getItem('id') }
      });
    },
    * fetchShops ({ payload }, { call, put }) {
      const response = yield call(getShopList, payload);
      console.log(response);
      yield put({
        type: "saveShops",
        payload: response.data
      });
    }
  },
  reducers: {
    save (state, action) {
      return { ...state, shopInfo: action.payload || {} };
    },
    init (state, action) {
      return { ...state, shopInfo: action.payload || {} };
    },
    creat (state, action) {
      return { ...state, shopInfo: action.payload || {} };
    },
    saveShops (state, action) {
      return { ...state, shopsList: action.payload || [] };
    }
  }
};
export default ShopModel;
