import {combineReducers} from 'redux';
import user from './user_reducer'
const rootReducer = combineReducers({
    user
})

export default rootReducer;

//Reducer 를 용도별로 나눠서 state를 별도로 관리하고 , combine Reducer를 이용해서 하나로 합쳐서 root Reducer에서 사용.