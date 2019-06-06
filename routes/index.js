var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');
var Link = require('../models/links');
var Tracking = require('../models/tracking');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i=0; i<docs.length; i+=chunkSize){
      productChunks.push(docs.slice(i, i+chunkSize));
    }
    res.render('shop/index', { title: 'GameStore  || Seguridad en Redes', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product){
      if(err){
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    });
});

router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/new-link', function(req, res, next){
  res.render('links/new-link');
});

router.post('/links/new-link', function(req, res, next){
  var newLink = new Link({
    user: req.user,
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
  });
  newLink.save(function(err, result){
    req.flash('success', '¡Enlace agregado exitosamente!');
    req.session.cart = null;
    res.redirect('/');
  });
});

router.get('/checkout', isLoggedIn,function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn,function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require('stripe')(
    "sk_test_ZbeB1Ox4ZurxFAxTG5lkXPdW00G9K8Ju0b"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "mxn",
    source: req.body.stripeToken,
    description: "Cargo de prueba"
  }, function(err, charge){
    if(err){
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err, result){
      req.flash('success', '¡Pago realizado exitosamente!');
      req.session.cart = null;
      res.redirect('/');
    });
  });
});

router.get('/track', function(req, res, next){
  res.render('admin/track');
});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}