import { createStore, Store, compose } from "redux";

import reducers from "../Reducers";

//import reducers
import { TarifaState } from "../Reducers/Tarifa/types";

export interface ApplicationState {
  TarifaReducer: TarifaState;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<ApplicationState> = createStore(
  reducers,
  composeEnhancers()
);

export default store;
