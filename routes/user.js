var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
var path = require('path');

const verifyLogin = (req, res, next) => {
  if(req.session.user.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

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
//   }]

router.get('/',(req, res) => {
  // res.render('index',{product,admin:true})
  let user = req.session.user;
  // console.log(user);
  productHelpers.getAllProducts().then((products) => {
    // console.log(products);
    res.render('user/view-products',{products,user,admin:false});
  })
});

router.get('/login',(req, res) => {
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.render('user/login',{loginError:req.session.userLoginError});
    req.session.userLoginError = false;
  }
})

router.get('/signup',(req, res) => {
  res.render('user/signup');
})

router.post('/signup',(req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);

    req.session.user = response;
    req.session.user.loggedIn = true;
    // user = req.session.user;
    // productHelpers.getAllProducts().then((products) => {
    //   res.render('user/view-products',{products,user,user:true});
    // })

    // res.redirect('/');
    res.redirect('/login');
  }) 
})

router.post('/login',(req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if(response.status) {
      req.session.user = response.user;
      req.session.user.loggedIn = true;
      res.redirect('/');
    } else {
      req.session.userLoginError = 'Invalid Username or Password';
      res.redirect('/login');
    }
  });   
});

router.get('/logout',(req, res) => {
  // req.session.destroy();
  req.session.user = null;
  user = req.session.user;
  productHelpers.getAllProducts().then((products) => {
    // console.log(products);
    res.render('user/view-products',{products,user,user:false});
  })
  res.redirect('/'); 
}) 

router.get('/cart', verifyLogin, (req, res) => {
  res.render('user/cart');
})

module.exports = router;