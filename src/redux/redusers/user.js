const initialState = {
  total: 0,
  history: [],
  id: 0,
  password: null,
  userName: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        ...action.payload
      };

    case "NEW_OPERATION":
      return {
        ...state,
        history: [...state.history, action.payload]
      };

    case "CHANGE_TOTAL":
      return {
        ...state,
        total: action.payload
      }

    case "CLEAR_HISTORY":
      return {
        ...state,
        history: [],
      };

    case "CLEAR_USER":
      return {
        ...state,
        ...initialState
      };


    default:
      return state;
  }
};

export default user;