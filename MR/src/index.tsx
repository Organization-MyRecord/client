import React from "react";
import { applyMiddleware, createStore } from 'redux';
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer from "./modules/Store";
import {Provider} from 'react-redux'
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
