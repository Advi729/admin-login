var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
const { ObjectID } = require('bson');

module.exports = {
    doSignup: (userData) => {
        return new Promise(async(resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.insertedId);
            })
        })
    },
    doLogin:(userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user) {
                bcrypt.compare(userData.Password,user.Password).then((status) => {
                    if(status) {
                        console.log('login successful'); 
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    } else {
                        console.log('login failed');
                        resolve({status:false});
                    }
                })
            } else {
                console.log('login failed.');
                resolve({status:false});
            }
        })
    },

    getAllUsers: ()=>{
        return new Promise((resolve, reject)=>{
            let user = db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(user);
        })
    },
    deleteUser: (userId)=>{ 
        return new Promise((resolve, reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:ObjectID(userId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    updateUser: (userId, userData)=>{
        return new Promise((resolve, reject) =>{
            db.get().collection(collection.USER_COLLECTION)
            .updateOne({_id:ObjectID(userId)}, {
                $set:{
                    Name: userData.Name,
                    Email: userData.Email,
                    Age : userData.Age
                }
            }).then((response)=>{
                resolve(response);
            })
        })
    },
    getUserDetail: (userId)=>{
        return new Promise((resolve, reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectID(userId)}).then((user)=>{
                resolve(user);
            })
        })
    }
}