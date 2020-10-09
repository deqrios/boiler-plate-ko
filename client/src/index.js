import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux"; //  아래의 컴포넌트들에 Redux store를 사용 할 수 있게 연결시키는 역할.
import { applyMiddleware, createStore } from "redux";
// applyMiddleware - Redux스토어의 디스패치에 미들웨어를 적용하는 스토어 강화기능. 비동기 동작을 간결하게 하고, 다양한 작업에 유용.
// createStore - 상태트리를 보관하는 저장소를 생성.
import promiseMiddleware from "redux-promise"; //   프로미스 기반의 비동기 작업을 조금 더 편하게 해주는 미들웨어.
import ReduxThunk from "redux-thunk"; //  비동기 작업을 매우 직관적이고 간단하게 관리 할 수 있게 만듦.
import Reducer from "./_reducers";
import "antd/dist/antd.css";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() - 리덕스 상태 모니터링 크롬 확장 프로그램에서 상태 모니터링하기 위한 코드.
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <App />
    </Provider>,

    document.getElementById("root")
);
