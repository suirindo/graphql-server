const Query = {
    users: async(root, args, { prisma }, info) => {
        try {
            //Userテーブルの中身を全て取得
            return prisma.users();
        }catch (error){
            throw error;
        }
    },
    posts(parent, args, { prisma }, info){
        try{
            // Postテーブルの中身をすべて取得
            return prisma.posts();
        }catch(error){
            throw error;
        }
    }
}
module.exports = Query

// // リゾルバ関数の用意
// // 引数の有無で条件分岐をしている

// import gql from 'graphql-tag'


// export const ALL_POSTS = gql`
// query{
//     posts{
//         id
//         title
//         author
//         postedUser{
//             id
//             name
//         }
//         updatedAt
//         createdAt
//     }
// }
// `

// export const ALL_USERS = gql`
// query{
//     users{
//         id
//         name
//         email
//         updatedAt
//     posts{
//         title
//         author
//     }
//     }
// }
// `
// const { printSchema } = require("graphql")





    // posts(parent, args, { db }, info) {
    //     // クエリを書いたときに引数が「ない」時は模擬データベースの内容をすべて表示
    //     if(!args.query){
    //         return db.posts
    //         //クエリを書いたときに引数が「ある」時は引数と title or author が一致したものだけを表示
    //     }else{
    //         return db.posts.filter((post) => {
    //             const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
    //             const isAuthorMatch = post.author.toLowerCase().includes(args.query.toLowerCase())
    //             return isTitleMatch || isAuthorMatch
    //         })
    //     }
    // }
