// proxy 설정을 추가해줌으로 /api로 시작되는 API는 target으로 설정된 서버 URL로 호출하도록 설정된다.

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};
