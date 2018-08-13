'use strict';
console.log('js is linked');

function Product(fileName){
  this.fileName = fileName;
  this.shown = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

var imgList = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg' ];

var numItems = imgList.length;
var imagesToShow = 2;

for(var i=0; i < numItems; i++){
  if(i <= imagesToShow){
    var itemWindow = document.getElementById('itemWindow');
    this['product_'+i] = new Product(imgList[i]);
    this['item_'+i] = document.createElement("img");
    this['item_'+i].src = `img/assets/${imgList[i]}`;
    itemWindow.appendChild(this['item_'+i]);
  }
  else{
    new Product(imgList[i]);
  }
}
