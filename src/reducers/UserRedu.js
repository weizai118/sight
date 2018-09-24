import { combineReducers } from 'redux';
const initialState = {
  code: 0,
  tips: '',
  loading: false,
}
const userRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTERREDU':
      return Object.assign({}, state, action.data);
    break;
    case 'CLEARREDU':
      return Object.assign({}, state, initialState);
    case 'SEND_TIPS':
      return Object.assign({}, state, action.tipsArray);
    case 'UPDATE_LOADING':
      return Object.assign({}, state, action.datas);
    default:
      return state;
  }
}
/*const reducers = combineReducers({
  userRedu
});
export default reducers;*/
export default userRedu;