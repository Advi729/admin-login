var db = require('../config/connection')   
var collection = require('../config/collections')

module.exports = {

    addProduct:(product, callback) => {
        // console.log(product);

        db.get().collection('product').insertOne(product).then((data) => {
            // console.log(data);
            // callback(data._id);
            // callback(data["ops"][0]["_id"]);
            callback(data.insertedId.toString()); 
        })
    },
    getAllProducts:() => {
        return new Promise(async(resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(product);
        })
    }
} 