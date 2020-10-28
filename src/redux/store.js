import {createStore} from "redux";
import reducer from "./reducer";

const initialState = {
    imgList: [],
    size: 9,
    page: 0,
    totalPage: 1,
    selected: null
}

const store = createStore(reducer, initialState);

export default store;
