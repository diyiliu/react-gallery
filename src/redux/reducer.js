import {LOADING_IMAGE, UPLOAD_IMAGE, CHANGE_SELECTED, REMOVE_IMAGE} from "./action";

const reducer = (state, action) => {
    let payload, imgList;
    switch (action.type) {
        case UPLOAD_IMAGE:

            return {...state, imgList: [action.payload, ...state.imgList]};
        case LOADING_IMAGE:

             payload = action.payload;
             imgList = payload.imgList;
             let {page, totalPage} = payload;
            return {...state, imgList: [...state.imgList, ...imgList], page, totalPage};

        case CHANGE_SELECTED:

            return {...state, selected: action.payload};
        case REMOVE_IMAGE:
            const id = action.payload;
            imgList = state.imgList.filter(img => img.id !== id);
            return {...state, imgList};
        default:
            return state;
    }
}

export default reducer;