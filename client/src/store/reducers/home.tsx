import { AnyAction } from 'redux';
import { HomeState } from '@/typings';
import * as actionTypes from '@/store/action-types';
const initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
        loading: false,// 如果正在加载中的话，loading=true
        list: [],
        hasMore: true,//刚开始肯定为true,如果服务器还有更多数据，就为true.
        offset: 0,//下次去服务器端接数的时候从哪个索引开始拉
        limit: 5 //限定每次拉的条数
    }
}
//immer: 不可变数据集  redux-immer 代替 redux-immutable 
export default function (state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload };
        case actionTypes.GET_SLIDERS:
            //  dispatch({ ...action, payload: error, error: true });
            if (action.error) {// action有了error属性，那说明promise失败了
                return state;
            } else {
                return { ...state, sliders: action.payload.data };
            }
        case actionTypes.SET_LESSONS_LOADING:
            //redux规定reducer永远要返回一个新的状态
            state.lessons.loading = action.payload;
            return state;
        case actionTypes.SET_LESSONS:
            state.lessons.loading = false;
            state.lessons.list = [...state.lessons.list, ...action.payload.list];
            state.lessons.hasMore = action.payload.hasMore;
            state.lessons.offset = state.lessons.offset + action.payload.list.length;
            return state;
        case actionTypes.REFRESH_LESSONS:
            state.lessons.loading = false;
            state.lessons.list = action.payload.list;
            state.lessons.hasMore = action.payload.hasMore;
            state.lessons.offset = action.payload.list.length;
            return state;
        default:
            return state;
    }
}