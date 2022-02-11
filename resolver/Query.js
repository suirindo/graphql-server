// リゾルバ関数の用意
// 引数の有無で条件分岐をしている

const { printSchema } = require("graphql")

const Query = {
    users: async(root, args, { prisma }, info) => {
        try {
            return prisma.users():
        }catch (error){
            throw error;
        }
    },
    posts(parent, args, { db }, info) {
        // クエリを書いたときに引数が「ない」時は模擬データベースの内容をすべて表示
        if(!args.query){
            return db.posts
            //クエリを書いたときに引数が「ある」時は引数と title or author が一致したものだけを表示
        }else{
            return db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isAuthorMatch = post.author.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isAuthorMatch
            })
        }
    }
}

module.exports = Query