var c = document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var matrix = [
    "1 1 1 1 1 1 1 1 1 1 1 ",
    "0 1 1 1 1 1 1 0 1 1 1 ",
    "0 0 1 0 1 0 0 0 0 0 1 ",
    "1 0 0 0 0 1 1 0 0 1 0 ",
    "1 0 0 0 1 0 0 0 0 0 0 ",
    "0 0 1 1 0 0 0 1 1 1 1 "
];

var font_size = 20;
var drops = [];

for (var x = 0; x < matrix[0].length; x++) {
    drops[x] = c.width - (x * font_size) + 300;
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    for (var i = 0; i < drops.length; i++) {
        var rowIndex = drops[i] % matrix.length;
        var text = matrix[rowIndex][i];

        // Stop raining when drops reach a certain point on the screen
        if (drops[i] * font_size <= c.height) {
            ctx.fillStyle = "#704292";
            ctx.font = font_size + "px arial";
            ctx.fillText(text, c.width - i * font_size, drops[i] * font_size);
        }

        if (drops[i] * font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 3);

var leftMatrix = [
    "1 1 1 1 1 1 1 1 1 1 1 ",
    "0 1 1 1 1 1 1 0 1 1 1 ",
    "0 0 1 0 1 0 0 0 0 0 1 ",
    "1 0 0 0 0 1 1 0 0 1 0 ",
    "1 0 0 0 1 0 0 0 0 0 0 ",
    "0 0 1 1 0 0 0 1 1 1 1 "
];

var leftDrops = [];

for (var x = 0; x < leftMatrix[0].length; x++) {
    leftDrops[x] = c.width - (x * font_size) - 20; 
}

function drawLeft() {
    ctx.fillStyle = "rgba(0, 0, 0, -1000)";
    ctx.fillRect(0, 0, c.width, c.height);

    for (var i = 0; i < leftDrops.length; i++) {
        var rowIndex = leftDrops[i] % leftMatrix.length;
        var text = leftMatrix[rowIndex][i];

        // Stop raining when drops reach a certain point on the screen
        if (leftDrops[i] * font_size >= c.height) {
            ctx.fillStyle = "#414291";
            ctx.font = font_size + "px arial";
            ctx.fillText(text, i * font_size, leftDrops[i] * font_size);
        }

        if (leftDrops[i] * font_size > c.height && Math.random() > 0.975) {
            leftDrops[i] = 0;
        }

        leftDrops[i]++;
    }
}
setInterval(drawLeft,1);
