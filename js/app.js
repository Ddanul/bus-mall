'use strict';
console.log('js is linked');

function Product(fileName, name, shown = 0, votes = 0) {
  this.fileName = fileName;
  this.name = name;
  this.shown = shown;
  this.votes = votes;
  this.percent = function () {
    var percent = Math.round((this.votes / this.shown) * 100);
    if(isNaN(percent)){
      return 0+'%';
    }else{
      return percent+'%';
    }
  };
  Product.allProducts.push(this);
}

Product.allProducts = [];

//List of image filenames
var imgList = [['bag.jpg', 'Rolley Bag'], ['banana.jpg', 'Banana Slicer'], ['bathroom.jpg', 'TP Ipad Holder'], ['boots.jpg', 'Toeless Rainboots'], ['breakfast.jpg', 'EZ Bake Breakfast'], ['bubblegum.jpg', 'Meatball Gum'], ['chair.jpg', 'Bumpy Chair'], ['cthulhu.jpg', 'Octopus-Bat Thing'], ['dog-duck.jpg', 'Dog Beak Muzzle'], ['dragon.jpg', 'Dragon Meat'], ['pen.jpg', 'Pen Utensils'], ['pet-sweep.jpg', 'Doggie Swiffer'], ['scissors.jpg', 'Pizza Scissors'], ['shark.jpg', 'Shark Pillow'], ['sweep.png', 'Baby Swiffer'], ['tauntaun.jpg', 'Horse Thing Sleeping Bag'], ['unicorn.jpg', 'Unicorn Meat'], ['usb.gif', 'Tentacle USB'], ['water-can.jpg', 'Self-Watering Can'], ['wine-glass.jpg', 'Pointless Wine Glass']];

//set variable to JSON Products from local storage
var loadProducts = JSON.parse(localStorage.getItem('products'));

//checks if local storage value set
//if set, re-establishes objects as Products
//else, it creates new Products
if(loadProducts){
  for(var i = 0; i < loadProducts.length; i++){
    new Product(loadProducts[i].fileName, loadProducts[i].name, loadProducts[i].shown, loadProducts[i].votes);
  }
}else{
  //instantiates new Product objects
  for (var j = 0; j < imgList.length; j++) {
    new Product(imgList[j][0], imgList[j][1]);
  }
}


//storing indexes for reference to avoid repetition
var oldIdx1 = 0;
var oldIdx2 = 7;
var oldIdx3 = 17;

var count = 0;

// var products = JSON.parse(localStorage.getItem('products'));

//declaring variables for first three products to display in HTML
var product1 = Product.allProducts[0];
var product2 = Product.allProducts[7];
var product3 = Product.allProducts[17];

//grabbing the image elements in HTML to change image later
var img1 = document.getElementsByTagName('img')[0];
var img2 = document.getElementsByTagName('img')[1];
var img3 = document.getElementsByTagName('img')[2];
var itemWindow = document.getElementById('itemWindow');

//updating count on HTML page
function updateCounter(){
  var counter = document.getElementById('count');
  console.log(count);
  counter.innerHTML = count;
}

//function to store products into local storage
function storeProducts() {
  localStorage.setItem('products', JSON.stringify(Product.allProducts));
}

function getNewProducts() {
  //get three new images to display;
  do {
    var randomIdx1 = Math.floor(Math.random() * imgList.length);
  } while (randomIdx1 === oldIdx1 || randomIdx1 === oldIdx2 || randomIdx1 === oldIdx3);
  do {
    var randomIdx2 = Math.floor(Math.random() * imgList.length);
  } while (randomIdx2 === oldIdx1 || randomIdx2 === oldIdx2 || randomIdx2 === oldIdx3 || randomIdx2 === randomIdx1);
  do {
    var randomIdx3 = Math.floor(Math.random() * imgList.length);
  } while (randomIdx3 === oldIdx1 || randomIdx3 === oldIdx2 || randomIdx3 === oldIdx3 || randomIdx3 === randomIdx1 || randomIdx3 === randomIdx2);

  //grab objects from array based on random indexs generated.
  product1 = Product.allProducts[randomIdx1];
  product2 = Product.allProducts[randomIdx2];
  product3 = Product.allProducts[randomIdx3];

  //adding to count of times image has been shown
  product1.shown++;
  product2.shown++;
  product3.shown++;

  //re-assigning old indexes to the new ones generated for next iteration reference.
  oldIdx1 = randomIdx1;
  oldIdx2 = randomIdx2;
  oldIdx3 = randomIdx3;

  //re-assign the source of the image in html to new product
  img1.src = `img/assets/${product1.fileName}`;
  img2.src = `img/assets/${product2.fileName}`;
  img3.src = `img/assets/${product3.fileName}`;
}

if (count < 25) {
  //script to run if image 1 clicked
  img1.addEventListener('click', function () {
    console.log('img1 has been clicked');
    if (count <= 25) {
      product1.votes++;
      count++;
      updateCounter();
    }
    if (count === 25) {
      displayResults();
      itemWindow.style.display = 'none';
      storeProducts();
    } else {
      getNewProducts();
    }
  }
  );

  //script to run if image 2 is clicked
  img2.addEventListener('click', function () {
    console.log('img2 has been clicked');
    if (count <= 25) {
      product2.votes++;
      count++;
      updateCounter();
    }
    if (count === 25) {
      displayResults();
      itemWindow.style.display = 'none';
      storeProducts();
    } else {
      getNewProducts();
    }
  }
  );

  //script to run if image 3 is clicked
  img3.addEventListener('click', function () {
    console.log('img3 has been clicked');
    if (count <= 25) {
      product3.votes++;
      count++;
      updateCounter();
    }
    if (count === 25) {
      displayResults();
      itemWindow.style.display = 'none';
      storeProducts();
    } else {
      getNewProducts();
    }
  }
  );
}

var color = function(){return Math.floor(Math.random()*255);};

//function to add a list of vote values per product.
function displayResults() {
  console.log('count has reached 25 votes');
  var listWindow = document.getElementsByTagName('div')[3];
  listWindow.className = 'main';
  for (var i = 0; i < Product.allProducts.length; i++) {
    var rating = Product.allProducts[i].percent();
    var results = document.getElementById('results');
    var showResults = document.createElement('li');
    showResults.innerHTML = `${Product.allProducts[i].name}: ${Product.allProducts[i].votes} votes; Rate: ${rating}.`;
    results.appendChild(showResults);
  }

  // declaring array variables for use in chart
  var allNames = [];
  var allVotes = [];
  var allShown = [];
  var chartColors = [];

  //assigning data to arrays to use for chart
  for(var x = 0; x < Product.allProducts.length; x++){
    allNames.push(Product.allProducts[x].name);
    allVotes.push(Product.allProducts[x].votes);
    allShown.push(Product.allProducts[x].shown);
    chartColors.push(`rgba(${color()}, ${color()}, ${color()}, 0.8)`);
  }
  //attempting to add a bar chart
  var ctx = document.getElementById('bar').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allNames,
      datasets: [{
        label: '# of Votes',
        data: allVotes,
        backgroundColor: chartColors,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

getNewProducts();
