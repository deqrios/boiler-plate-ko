// * Higher-order Component

import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

// =>
export default function (SpecificComponent, option, adminRoute = null) {
    // * SpecifiComponent - 인증검사를 할 component.

    // * option
    // * null  => 아무나 출입이 가능한 페이지
    // * true  => 로그인한 유저만 출입이 가능한 페이지
    // * false => 로그인한 유저는 출입 불가능한 페이지

    // * adminRoute - *

    function AuthenticationChek(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then((response) => {
                console.log(response);

                //  로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    // :: 로그인 하지않고 로그인 유저만 출입 가능한 페이지에 접근하면, login창으로 이동시킨다.
                    if (option) props.history.push("/login");
                } else {
                    //  로그인 한 상태
                    // :: adminRoute에 의한 접근과 접근한 유저가 admin이 아닐경우, 초기화면으로 이동.
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push("/");
                    } else {
                        // :: 로그인 한 상태여도 페이지접근 권한이 없으면, 초기화면으로 이동.
                        if (option === false) props.history.push("/");
                    }
                }
            });

            Axios.get("/api/users/auth");
        }, []);
        // 옵션에 맞게 설정된 props를 가지고 리턴.
        return <SpecificComponent {...props} />;
    }

    return AuthenticationChek;
}
