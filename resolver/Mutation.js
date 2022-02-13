// Mutationのリゾルバ関数では、dbの更新とSubscriptionの着火をしている

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUserId = require('../options/getUserId');
const { prisma } = require('../prisma/generated/prisma-client');

const Mutation = {
    createPost(parent, args, {prisma,request},/*{ db, pubsub },*/ info) {
        const userId = getUserId(request)
        // console.log(userId) 投稿するユーザーのID
        // データベースにデータを追加
        return prisma.createPost({
            ...args.data,
            postedUser: {
                connect: {
                    id: userId
                }
            }
        });

        // const postNumTotal = String(db.posts.length + 1)
        // const post = {
        //     id: postNumTotal,
        //     ...args.data
        // }
        // // 模擬データベース更新
        // db.posts.push(post)
        // // サブスクリプション着火、トピック名とデータを指定
        // pubsub.publish('post', {
        //     post: {
        //         mutation: 'CREATED',
        //         data: post
        //     }
        // })
        // return post
    },
    async updatePost(parent, args, { prisma,request },/*{ db, pubsub },*/ info) {
        const { id, /*data*/ } = args
        // データベース内のデータの内容を更新
        return prisma.updatePost({
            where:{
                id: id,
            },
            data:{
                ...args.data,
            }
        })
        // const post = db.posts.find((post) => post.id === id)
        // if(!post) {
        //     throw new Error('Post not found')
        // }
        // if(typeof data.title === 'string' && typeof data.author === 'string') {
        //     // 模擬データベース更新
        //     post.title = data.title
        //     post.author = data.author
        // // サブスクリプション着火、トピック名とデータを指定
        //     pubsub.publish('post', {
        //         post: {
        //             mutation:'UPDATED',
        //             data: post
        //         }
        //     })
        // }
        // return post
    },
    async deletePost(parent, args, { pubsub, prisma, request} ,/*{ db, pubsub },*/ info) {
        const { id /*data: { email, name, password }*/ } = args;
        //データベースから該当のデータを削除
        return prisma.deletePost({
            id: id
        })


        // const user = await prisma.createUser({
        //     email,
        //     name,
        //     // bcrptでパスワードをハッシュ化
        //     password: bcrypt.hashSync(password, 10)
        // });
        // return {
        //     user,
        //     // サーバーがJWTトークンを発行
        //     token: jwt.sign(user.id, )
        // }
        
        // // データベース内のデータの内容を更新
        // return prisma.updatePost({

        // })
        // const post = db.posts.find((post) => post.id === args.id)
        // const postIndex = db.posts.findIndex((post) => post.id === args.id)

        // if(postIndex === -1) {
        //     throw new Error('Post not found')
        // }
        // // 模擬データベース更新
        // db.posts.splice(postIndex, 1)
        // // サブスクリプション着火、トピック名とデータを指定
        // pubsub.publish('post', {
        //     post: {
        //         mutation: 'DELETED',
        //         data: post
        //     }
        //  })
        // return post
    },
    async createUser(parent, args, { prisma }, info) {
        const { data: { email, name, password } } = args;
        const user = await prisma.createUser({
            email,
            name,
            // bcryptでパスワードをハッシュ化
            password: bcrypt.hashSync(password, 10)
        });
        return {
            user,
            //サーバーがJWTトークンを発行
            token: jwt.sign(user.id, 'supersecret')
        }
    },
    async login(parent, args, { prisma }, info) {
        const { data: { email, password } } = args;
        // メールアドレスと照合
        const [ user ] = await prisma.users({
            where: {
                email
            }
        })
        if (!user) throw new Error('Unable to Login');
        // パスワードと照合
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) throw new Error('Unable to Login');
        return{
            user,
            token : jwt.sign(user.id, 'supersecret')
        };
    }
}
module.exports = Mutation