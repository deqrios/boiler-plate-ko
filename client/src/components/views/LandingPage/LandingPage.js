import React, { useEffect } from "react";
import axios from "axios";

// => 시작페이지를 그려주는 component.
function LandingPage(props) {
    // => component가 mount될 때, get요청을보내 응답을 받아온다. 콘솔창에서 확인.
    useEffect(() => {
        axios.get("/api/hello").then((response) => console.log(response));
    }, []);

    // => 로그아웃버튼이 click되면, 응답상태에 따라 실패창을 보여주거나, 로그아웃시키고 login창으로 전환.
    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            if (response.data.success) {
                props.history.push("/login");
            } else {
                alert("로그아웃 실패 했습니다.");
            }
        });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>로그 아웃</button>
        </div>
    );
}

export default LandingPage;
