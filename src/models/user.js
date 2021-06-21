import { queryCurrent, query as queryUsers, queryNotices, queryCity, queryProvince } from "@/services/user";
const UserModel = {
  namespace: "user",
  state: {
    currentUser: {},
    province: [],
    city: [],
    isLoading: false,
  },
  effects: {
    *fetch (_, { call, put }) {
      const response = yield call(queryUsers);
      // console.log(response);
      yield put({
        type: "save",
        payload: response.data
      });
    },
    *queryCurrent ({ payload }, { call, put }) {
      const current = yield call(queryCurrent, payload);
      yield put({
        type: "saveCurrentUser",
        payload: current.data
      });
    },
    *setCurrent ({ payload }, { call, put }) {
      yield put({
        type: "saveCurrentUser",
        payload
      });
    },
    *fetchProvince (_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const province = yield call(queryProvince);
      console.log(province);
      yield put({
        type: 'setProvince',
        payload: province,
      });
    },

    *fetchCity ({ payload }, { call, put }) {
      const response = yield call(queryCity, payload);
      yield put({
        type: 'setCity',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser (state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeNotifyCount (
      state = {
        currentUser: {}
      },
      action
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    },
    setProvince (state, action) {
      return { ...state, province: action.payload };
    },
    setCity (state, action) {
      return { ...state, city: action.payload };
    },

    changeLoading (state, action) {
      return { ...state, isLoading: action.payload };
    },
  }
};
export default UserModel;
