
export default {
  namespace: "map",
  state: {
    currentUser: {}
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: "save",
        payload: response
      });
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    }
  }
};
