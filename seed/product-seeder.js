var Product = require('../models/product');

//  Connect mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tienda', { useNewUrlParser: true });

var products = [
    new Product({
        imagePath: "images/assassins-creed-switch.jpg",
        title: 'Assassins Creed - Nintendo Switch',
        description: 'Matar gente estilo ninja',
        price: 1500
    }),
    new Product({
        imagePath: "images/cod_xbox.jpg",
        title: 'Call Of Duty - Xbox ONE',
        description: 'Matar gente estilo gringos',
        price: 600
    }),
    new Product({
        imagePath: "images/crash_ps4.jpg",
        title: 'Crash Bandicoot- PS4',
        description: 'Old school :D',
        price: 1000
    }),
    new Product({
        imagePath: "images/destiny-2_ps4.jpg",
        title: 'Destiny 2 - PS4',
        description: 'Paisajes bonitos',
        price: 850
    }),
    new Product({
        imagePath: "images/fifa_ps4.jpg",
        title: 'FIFA 19 - PS4',
        description: 'Patear balones',
        price: 900
    }),
    new Product({
        imagePath: "images/fifa_xbox.jpg",
        title: 'FIFA 19 - Xbox ONE',
        description: 'Patear balones',
        price: 900
    }),
    new Product({
        imagePath: "images/gta_ps4.jpg",
        title: 'Grand Theft Auto V - PS4',
        description: 'Súper peleas clandestinas',
        price: 899
    }),
    new Product({
        imagePath: "images/gta_360.jpg",
        title: 'Grand Theft Auto V - Xbox 360',
        description: 'Robo de autos',
        price: 899
    }),
    new Product({
        imagePath: "images/gta_one.jpg",
        title: 'Grand Theft Auto V - Xbox ONE',
        description: 'Súper combinaciones de control',
        price: 900
    }),
    new Product({
        imagePath: "images/halo_reach.jpg",
        title: 'Halo Reach - Xbox 360',
        description: 'Legend',
        price: 400
    }),
    new Product({
        imagePath: "images/lego_marvel_ps4.jpg",
        title: 'LEGO Marvel - PS4',
        description: 'Hermoso juego',
        price: 670
    }),
    new Product({
        imagePath: "images/mariokart8.jpg",
        title: 'Mario Kart - Nintendo Switch',
        description: 'Carritos',
        price: 1200
    }),
    new Product({
        imagePath: "images/mortal-ps4.jpg",
        title: 'Mortal Kombat 11 - PS4',
        description: 'Golpes como a Faitelson',
        price: 1500
    }),
    new Product({
        imagePath: "images/mortal-one.jpg",
        title: 'Mortal Kombat 11 - Xbox ONE',
        description: 'Golpes como a Faitelson en Xbox',
        price: 1400
    }),
    new Product({
        imagePath: "images/mortal-switch.jpg",
        title: 'Mortal Kombat 11 - Nintendo Switch',
        description: 'Sangreee',
        price: 1499
    }),
    new Product({
        imagePath: "images/spider-man.jpg",
        title: 'SPIDER-MAN - PS4',
        description: 'Just another service provided by your friendly neighborhood Spider-Man!',
        price: 1250
    })
];

var done = 0;
for(var i=0; i<products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done == products.length){
            exit();
        }
    });
}

//  Disconnect mongoose
function exit(){
    mongoose.disconnect();
}