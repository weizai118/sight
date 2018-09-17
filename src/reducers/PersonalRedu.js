const initialState = {
  listData: [],
  total: 0,
  count: 0,
  code: 0,
  avatar: '//downfuture.com/user.png',
  userName: false,
  headId: '0'
};
const userRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'PERSONALREDU':
      return Object.assign({}, state, action.data);
    break;
    case 'CLEARREDU':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
export default userRedu;