import { combineReducers } from "redux";

//import reduces lib
import { reducer as toastrReducer } from "react-redux-toastr";

//import reducers
import TarifaReducer from "./Tarifa";

export default combineReducers({
  TarifaReducer,
  toastr: toastrReducer,
});
