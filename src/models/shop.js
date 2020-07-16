import { getShopById, getShopList } from '@/services/shop'
const ShopModel = {
  namespace: "shop",
  state: {
    shopsList: [{
      id: 1,
      merchantId: 1,
      name: "手机特卖店",
      shopDesc: "一家专门做手机特卖的店铺",
      dayBill: 20,
      weekBill: 178,
      monthBill: 90,
      monthCount: 2000
    }],
    shopInfo: {
      id: 1,
      merchantId: 1,
      name: "",
      shopDesc: ""
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getShopById, payload);
      console.log(response);
      yield put({
        type: "save",
        payload: response.data
      });
    },
    *clean({ payload }, { call, put }) {
      yield put({
        type: "clean",
        payload: { merchantId: window.localStorage.getItem('id') }
      });
    },
    *fetchShops({ payload }, { call, put }) {
      const response = yield call(getShopList, payload);
      console.log(response);
      yield put({
        type: "saveShops",
        payload: response.data
      });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, shopInfo: action.payload || {} };
    },
    clean(state, action) {
      return { ...state, shopInfo: action.payload || {} };
    },
    saveShops(state, action) {
      return { ...state, shopsList: action.payload || [] };
    }
  }
};
export default ShopModel;
