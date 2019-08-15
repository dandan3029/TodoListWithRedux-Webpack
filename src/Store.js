import {createStore, combineReducers} from 'redux';
import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';

const reducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer
}); // combineReducer的存在是因为createSrote中只能接受一个reducer


export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())