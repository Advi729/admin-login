var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const adminHelpers = require('../helpers/admin-helpers');
const userHelpers = require('../helpers/user-helpers');

const verifyAdminLogged = (req, res, next) => {
  if(req.session.admin) {
    // isAdmin = true;
    next();
  } else {
    // req.session.adminLoginError = 'Invalid Username or Password';
    res.render('admin/login');
    // req.session.adminLoginError = false;
  }
}

// const adminData = {
//   Name: 'Adal Adwaid',
//   Email: 'adaladwaid@gmail.com',
//   Password: '789456'
// }

// adminHelpers.doAdminCreate(adminData).then((response) => {
//   console.log(response);
// });

/* GET users listing. */
// router.get('/admin', function(req, res, next) {
//   let admin = req.session.admin;
//   productHelpers.getAllProducts().then((products) => {
//     console.log(products);
//     res.render('admin/view-products',{products,admin});
//   })
//   // res.render('admin/view-products',{product,admin:true});
// });

router.get('/', verifyAdminLogged, function(req, res, next) {
  let admin = req.session.admin;
  console.log('admin is made: '+admin)
  // if(admin) {
    // res.redirect('/admin/view-products');
          // req.session.admin.loggedIn = true;
          productHelpers.getAllProducts().then((products) => {
          // console.log(products);
          res.render('admin/view-products',{admin: true,products,admin});
        })
})

// router.get('/login',(req, res) => {
//   if(req.session.user) {
//     res.redirect('/');
//   } else {
//     res.render('user/login',{loginError:req.session.userLoginError});
//     req.session.userLoginError = false;
//   }
// })

router.post('/login-admin',(req, res) => {
  adminHelpers.doAdminLogin(req.body).then((response) => {
    if(response.status) {
      req.session.admin = response.admin;
      req.session.admin.loggedIn = true;
      // res.redirect('/admin/view-products');
      res.redirect('/admin');
      
    } else {
      req.session.adminLoginError = 'Invalid Username or Password';
      // res.redirect('/admin');
      res.render('admin/login',{'adminLogError':req.session.adminLoginError});
      
      // res.redirect('/admin');

      req.session.adminLoginError = false;
      
      

      // else {
      //   req.session.userLoginError = 'Invalid Username or Password';
      //   res.redirect('/login');
      // }
    }
  }); 
});

router.get('/logout-admin',(req, res) => {
  req.session.admin = null;
  
  // res.render('admin/login-admin');
  res.redirect('/admin'); 
  // res.render('login');
}) 


router.get('/add-product', function(req, res) {
  admin = req.session.admin;
  res.render('admin/add-product',{admin:true, admin});
});

router.post('/add-product', (req, res) => {
  // console.log(req.body);
  // console.log(req.files.Image);
  admin = req.session.admin;
  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.Image;
    console.log(id);
    image.mv('./public/images/product-images/'+id+'.jpg',(err) => {
      if(!err) {
        // res.render("admin/view-products",{admin:true, admin, products});
        // res.redirect('/admin/add-product');
        productHelpers.getAllProducts().then((products) => {
        
          res.render('admin/view-products',{admin: true,products,admin});
        })
      }
      else{
        console.log(err);
      }
    });
    // res.render is there
  });
});

// All users..
router.get('/view-users', (req, res)=>{
  admin = req.session.admin;
  userHelpers.getAllUsers().then((user)=>{
      res.render('admin/view-users', {admin: true,user,admin});
  })
})

// Deleting user
router.get('/delete-users/:id', (req, res)=>{
  admin = req.session.admin;
  let userId = req.params.id;
  console.log(userId);
  userHelpers.getAllUsers().then((user)=>{
    res.render('admin/view-users', {admin: true,user,admin});
  })
  userHelpers.deleteUser(userId).then((response)=>{
      res.redirect('/admin/view-users');
  })
})

// Edit user
router.get('/edit-users/:id', (req, res)=>{
  admin = req.session.admin;
  userHelpers.getUserDetail(req.params.id).then((user)=>{
      console.log(user);
      res.render('admin/edit-users', {user,admin: true,admin});
  })
})


router.post('/edit-users/:id', (req, res)=>{
  userHelpers.updateUser(req.params, req.body).then(()=>{
      res.redirect('/admin/view-users');
  })
}) 



module.exports = router;
