'use strict';
console.log('js is linked');

function Product(arr) {
  this.fileName = arr[0];
  this.name = arr[1];
  this.shown = 0;
  this.votes = 0;
  this.percent = function () {
    var percent = Math.round((this.votes / this.shown) * 100);
    if (isNaN(percent)) {
      return 0 + '%';
    } else {
      return percent + '%';
    }
  };
  Product.allProducts.push(this);
}

Product.allProducts = [];

//List of image filenames
var imgList = [['bag.jpg', 'Rolley Bag'], ['banana.jpg', 'Banana Slicer'], ['bathroom.jpg', 'TP Ipad Holder'], ['boots.jpg', 'Toeless Rainboots'], ['breakfast.jpg', 'EZ Bake Breakfast'], ['bubblegum.jpg', 'Meatball Gum'], ['chair.jpg', 'Bumpy Chair'], ['cthulhu.jpg', 'Octopus-Bat Thing'], ['dog-duck.jpg', 'Dog Beak Muzzle'], ['dragon.jpg', 'Dragon Meat'], ['pen.jpg', 'Pen Utensils'], ['pet-sweep.jpg', 'Doggie Swiffer'], ['scissors.jpg', 'Pizza Scissors'], ['shark.jpg', 'Shark Pillow'], ['sweep.png', 'Baby Swiffer'], ['tauntaun.jpg', 'Horse Thing Sleeping Bag'], ['unicorn.jpg', 'Unicorn Meat'], ['usb.gif', 'Tentacle USB'], ['water-can.jpg', 'Self-Watering Can'], ['wine-glass.jpg', 'Pointless Wine Glass']];

for (var i = 0; i < imgList.length; i++) {
  new Product(imgList[i]);
}

//storing indexes for reference to avoid repetition
var oldIdx1 = 0;
var oldIdx2 = 7;
var oldIdx3 = 17;
//var oldIdx = [0, 7, 17];

var count = 0;

//declaring variables for first three products to display in HTML
var product1 = Product.allProducts[0];
// product1.shown++;
var product2 = Product.allProducts[7];
// product2.shown++;
var product3 = Product.allProducts[17];
// product3.shown++;

//grabbing the image elements in HTML to change image later
var img1 = document.getElementsByTagName('img')[0];
var img2 = document.getElementsByTagName('img')[1];
var img3 = document.getElementsByTagName('img')[2];
var itemWindow = document.getElementById('itemWindow');

//updating count on HTML page
function updateCounter() {
  var counter = document.getElementById('count');
  counter.innerHTML = count;
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
    } else {
      getNewProducts();
    }
  }
  );
}

var color = function () { return Math.floor(Math.random() * 255); };

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
  for (var j = 0; j < Product.allProducts.length; j++) {
    allNames.push(Product.allProducts[j].name);
    allVotes.push(Product.allProducts[j].votes);
    allShown.push(Product.allProducts[j].shown);
    chartColors.push(`rgba(${color()}, ${color()}, ${color()}, 0.8)`);
  }
  console.log('chart colors: ' + chartColors);
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
            beginAtZero: true
          }
        }]
      }
    }
  });
}

getNewProducts();
