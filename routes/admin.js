var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');

// const product = [{
//   name: 'HP Victus 16',
//   price: 55000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg'
// },
// {
//   name: 'HP Victus 17',
//   price: 65000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg' 
// },
// {
//   name: 'HP Victus 18',
//   price: 58000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg'   
// },
// {
//   name: 'HP Victus 19',
//   price: 85000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg'   
// },
// {
//   name: 'HP Victus 20',
//   price: 50000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg'
// },
// {
//   name: 'HP Victus 21',
//   price: 78000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg' 
// },
// {
//   name: 'HP Victus 22',
//   price: 46000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg'   
// },
// {
//   name: 'HP Victus 23',
//   price: 80000,
//   description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//   image: 'images/laptop.jpg'   
// }
// ]

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    console.log(products);
    res.render('admin/view-products',{products,admin:true});
  })
  // res.render('admin/view-products',{product,admin:true});
});

router.get('/add-product', function(req, res) {
  res.render('admin/add-product');
});

router.post('/add-product', (req, res) => {
  // console.log(req.body);
  // console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.Image;
    console.log(id);
    image.mv('./public/images/product-images/'+id+'.jpg',(err) => {
      if(!err) {
        res.render("admin/add-product");
      }
      else{
        console.log(err);
      }
    });
  });
});




module.exports = router;
