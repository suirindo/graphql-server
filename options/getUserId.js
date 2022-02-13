// HTTPヘッダーの「Authorization」に紐づいたJWTトークンをもとに
// ユーザー情報の認証をする

const jwt = require('jsonwebtoken');

const getUserId = (request, requireAuth = true) => {
    // JWTトークンの値
    // console.log(request.req.headers.authorization):
    const header = request.headers.authorization;
    if(header) {
        const token = header.replace('Bearer', '');
        //第2引数はenvに変える
        const decoded = jwt.verify(token, 'supersecret');
        // console.log(decoded)//ユーザーID
        return decoded;
    }

    if(requireAuth) {
        throw new Error('Authentication required');
    }

    return null;
}

module.exports = getUserId;