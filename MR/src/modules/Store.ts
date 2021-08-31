import {combineReducers} from 'redux'
import User from './User'

const rootReducer = combineReducers({
    User
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>      //상태 조회를 위한 타입