const mongoose = require("mongoose"); //  MongoDB기반의 node.js용 ODM(Object Data Mapping) 라이브러리. (document -> JS object)
const bcrypt = require("bcrypt"); //    민감한 정보를 해시처리 하기위한 라이브러리.
const saltRounds = 10;
const jwt = require("jsonwebtoken"); //  token을 발급해서, 인증처리를 쉽게 하는 라이브러리.

// * DB 스키마를 지정.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre("save", function (next) {
    const user = this;
    //  비밀번호가 변동이 있을때만 암호화.
    if (user.isModified("password")) {
        //  비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
    //plainPassword 1234567     암호화된 비밀번호 $2b$10$yLHiRwd1JRWUEUjRx2v7bO53ay7Eb5ffppx0ta1pHHIllR/wY.9cm
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.generateToken = function (callback) {
    const user = this;
    console.log("user._id", user._id);

    //  jsonwebtoken을 이용해서 token을 생성하기

    const token = jwt.sign(user._id.toHexString(), "secretToken");

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token;
    user.save(function (err, user) {
        if (err) return callback(err);
        callback(null, user);
    });
};

userSchema.statics.findByToken = function (token, callback) {
    const user = this;

    // user._id + "" = token;
    //토큰을 decode 한다.
    jwt.verify(token, "secretToken", function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return callback(err);
            callback(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
