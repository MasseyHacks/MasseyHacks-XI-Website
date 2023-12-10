var c = document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var matrix = [
    "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 ",
    "0 1 1 1 1 1 1 0 1 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 1 0 1 1 1 ",
    "0 0 1 0 1 0 0 0 0 0 1 0 0 1 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 ",
    "1 0 0 0 0 1 1 0 0 1 0 1 0 0 0 0 1 1 0 0 1 0 0 1 1 0 0 1 0 ",
    "1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 ",
    "0 0 1 1 0 0 0 1 1 1 1 0 0 1 1 0 0 0 1 1 1 1 0 0 0 1 1 1 1 "
];

var font_size = 25;
var drops = [];

for (var x = 0; x < matrix[0].length; x++) {
    drops[x] = (x * font_size) ;
}

function draw() {
    for (var i = 0; i < drops.length; i++) {
        var rowIndex = drops[i] % matrix.length;
        var text = matrix[rowIndex][i];

        // Stop raining when drops reach a certain point on the screen
        if (drops[i] * font_size <= c.height) {
            ctx.fillStyle = "#704292";
            // ctx.fillStyle = "#ffffff"
            ctx.font = font_size + "px arial";
            ctx.fillText(text, c.width - i * font_size, drops[i] * font_size);
        }

        if (drops[i] * font_size > c.height && Math.random() > 0.8) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 50);

var backgroundImage = new Image();
backgroundImage.src = 'assets/bg2.svg'; 
function drawBG() {
    // ctx.fillStyle = "rgba(0, 0, 0, 1)";
    // ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(backgroundImage, 0, 0, c.width, c.height);
}

setInterval(drawBG, 200); 