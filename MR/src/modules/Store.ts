import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "./User";
import Post from "./Post";
import Modal from "./Modal";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["User", "Post"],
};

const rootReducer = combineReducers({
  User,
  Post,
  Modal,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>; //상태 조회를 위한 타입
