// :: Deploy여부에 따라 DB URI를 로컬환경에서 가져오느냐, deploy서버에서 가져오느냐의 차이.
if (process.env.NODE_ENV === "production") {
    module.exports = require("./prod");
} else {
    module.exports = require("./dev");
}
