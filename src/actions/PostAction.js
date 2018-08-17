const getAvatarA = (dispatch, count, selectValue) => {
  dispatch({
    type: 'GETPOSTAVATAR_SAGA',
    count,
    selectValue
  });
}

const getPostDatasA = (dispatch, count, selectValue) => {
  dispatch({
    type: 'GETPOSTDATAS_SAGA',
    count,
    selectValue
  }); 
}

const createTheme = (dispatch, datas) => {
  dispatch({
    type: 'CREATETHEME_SAGA',
    datas
  });
}

const saveSelectValue = (dispatch, editorSelectValue, postRedu) => {
  dispatch({
    type: 'UPDATESELECT_SAGA',
    editorSelectValue,
    postRedu
  }); 
}

const saveinputThemeValue = (dispatch, inputThemeValue, postRedu) => {
  dispatch({
    type: 'UPDATEINPUTTHEME_SAGA',
    inputThemeValue,
    postRedu
  }); 
}

const clearCode = (dispatch, postRedu, style) => {
  dispatch({
    type: 'CLEARCODE_SAGA',
    postRedu,
    style
  });
}
export { 
  getAvatarA,
  createTheme,
  saveSelectValue,
  saveinputThemeValue,
  clearCode,
  getPostDatasA
};