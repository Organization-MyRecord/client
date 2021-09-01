import React from "react";
import { applyMiddleware, createStore } from 'redux';
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer from "./modules/Store";
import {Provider} from 'react-redux'
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))
const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading = {null} persistor = {persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
