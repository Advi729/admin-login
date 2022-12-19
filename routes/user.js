var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
var path = require('path');

// router.use(express.static(path.join(__dirname, 'public')));

// const product = [{
//     name: 'HP Victus 16',
//     price: 55000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg'
//   },
//   {
//     name: 'HP Victus 17',
//     price: 65000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg' 
//   },
//   {
//     name: 'HP Victus 18',
//     price: 58000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg'   
//   },
//   {
//     name: 'HP Victus 19',
//     price: 85000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg'   
//   },
//   {
//     name: 'HP Victus 20',
//     price: 50000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg'
//   },
//   {
//     name: 'HP Victus 21',
//     price: 78000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg' 
//   },
//   {
//     name: 'HP Victus 22',
//     price: 46000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg'   
//   },
//   {
//     name: 'HP Victus 23',
//     price: 80000,
//     description: 'HP Victus 16-e0550AX Gaming Laptop (AMD Ryzen 7 5800H/ 8GB/ 512GB SSD/ Win11/ 4GB Graph)',
//     image: 'images/laptop.jpg'   
//   }
//   ]

// router.get('/', (req, res) => {
//     if(req.session.user) {   
//         res.render('home', {product, user: req.session.user, title: 'Shopping Cart'});  
//     } else {
//         res.send('Unauthorised User');
//     }    
// });

router.get('/',(req, res) => {
  // res.render('index',{product,admin:true})
  let user = req.session.user;
  console.log(user);
  productHelpers.getAllProducts().then((products) => {
    // console.log(products);
    res.render('user/view-products',{products,user});
  })
});

router.get('/login',(req, res) => {
  res.render('user/login');
})

router.get('/signup',(req, res) => {
  res.render('user/signup');
})

router.post('/signup',(req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
  }) 
})

router.post('/login',(req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if(response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });   
});

router.get('/logout',(req, res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;