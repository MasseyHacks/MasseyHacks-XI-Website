var c = document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;
function screenSize(){
  if (window.innerHeight != c.height || window.innerWidth != c.width){
    c.height = window.innerHeight;
    c.width = window.innerWidth;
  }
}

setInterval(screenSize, 50);

var font_size = 14;
var columns = c.width / font_size;
var drops = [];

for (var x = 0; x < columns; x++) {
  drops[x] = 1;
}

function randColor() {
    var colors = ['rgba(121, 17, 246, 0.6)', 'rgba(221, 70, 215, 0.6)', 'rgba(9, 201, 209, 0.6)'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

function draw() {
  drawBG()
    // ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    // ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = randColor();
  ctx.font = font_size + "px arial";

  for (var i = 0; i < drops.length; i++) {
    var text = Math.round(Math.random()); // Generate random 0 or 1
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    if (drops[i] * font_size > c.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 30);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




var backgroundImage = new Image();
backgroundImage.src = 'assets/bg4.svg'; 
function drawBG() {
    ctx.drawImage(backgroundImage, 0, 0, c.width, c.height);
}

// setInterval(drawBG, 3000);