// 여러 리듀서들이 생성될 수 있는데, combineReducers 기능으로 여러 reducer들을 한데 모아,
// rootReducer로 축약하고, store에 넘겨주는 역할을 한다.

import { combineReducers } from "redux";
import user from "./user_reducer";

const rootReducer = combineReducers({
    user,
});

export default rootReducer;
