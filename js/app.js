'use strict';
console.log('js is linked');

function Product(fileName){
  this.fileName = fileName;
  this.shown = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

//List of image filenames
var imgList = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg' ];

for(var i=0; i<imgList.length; i++){
  new Product(imgList[i]);
}

var oldIdx1 = 0;
var oldIdx2 = 7;
var oldIdx3 = 17;
var count = 0;

var product1 = Product.allProducts[0];
product1.shown++;
var product2 = Product.allProducts[7];
product2.shown++;
var product3 = Product.allProducts[17];
product3.shown++;

var img1 = document.getElementsByTagName('img')[0];
var img2 = document.getElementsByTagName('img')[1];
var img3 = document.getElementsByTagName('img')[2];

function getNewProducts(){
  //get three new images to display;
  do{
    var randomIdx1 = Math.floor(Math.random()*imgList.length);
  } while (randomIdx1 === oldIdx1 || randomIdx1 === oldIdx2 || randomIdx1 === oldIdx3);
  do{
    var randomIdx2 = Math.floor(Math.random()*imgList.length);
  } while (randomIdx2 === oldIdx1 || randomIdx2 === oldIdx2 || randomIdx2 === oldIdx3 || randomIdx2 === randomIdx1);
  do{
    var randomIdx3 = Math.floor(Math.random()*imgList.length);
  } while (randomIdx3 === oldIdx1 || randomIdx3 === oldIdx2 || randomIdx3 === oldIdx3 || randomIdx3 === randomIdx1 || randomIdx3 === randomIdx2);

  //grab objects from array based on random indexs generated.
  product1 = Product.allProducts[randomIdx1];
  product2 = Product.allProducts[randomIdx2];
  product3 = Product.allProducts[randomIdx3];

  //re-assigning old indexes to the new ones generated for next iteration reference.
  oldIdx1 = randomIdx1;
  oldIdx2 = randomIdx2;
  oldIdx3 = randomIdx3;

  //re-assign the source of the image in html to new product
  img1.src = `img/assets/${product1.fileName}`;
  img2.src = `img/assets/${product2.fileName}`;
  img3.src = `img/assets/${product3.fileName}`;
}

//script to run if image 1 clicked
img1.addEventListener('click', function(){
  console.log('img1 has been clicked');
  product1.votes++;
  count++;
  getNewProducts();
  }
);

//script to run if image 2 is clicked
img2.addEventListener('click', function(){
  console.log('img2 has been clicked');
  product2.votes++;
  count++;
  getNewProducts();
  }
);

//script to run if image 3 is clicked
img3.addEventListener('click', function(){
  console.log('img3 has been clicked');
  product3.votes++;
  count++;
  getNewProducts();
  }
);











// Zombie Code

// var numItems = imgList.length;
// var imagesToShow = 2;
// //for loop to make display specified number of products on main page.
// for(var i=0; i < numItems; i++){
//   if(i <= imagesToShow){
//     var itemWindow = document.getElementById('itemWindow');
//     this['product_'+i] = new Product(imgList[i]);
//     this['item_'+i] = document.createElement("img");
//     this['item_'+i].src = `img/assets/${imgList[i]}`;
//     itemWindow.appendChild(this['item_'+i]);
//   }
//   else{
//     new Product(imgList[i]);
//   }
// }
// var img1 = document.getElementById('img')[0];
// img1.addEventListener('click',function(){
//   this[]
// })