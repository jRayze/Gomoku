export default  function printMatrice() {
    for (y = 0; y < matrix.length; y++) {
        console.log(matrix[y]);
    }
}

export default  function draw() {
    var canvas = document.getElementById('plateau');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var x = 0;
        var y = 0;
        for (; x < 18; x++) {
            y = 0;
            ctx.strokeRect((y * 40) + 20, (x * 40) + 20, 40, 40);
            for (; y < 18; y++) {
                ctx.strokeRect((y * 40) + 20, (x * 40) + 20, 40, 40);
            }
        }
    }
}

export default  function drawMatrice(ctx) {
    for (y = 0; y <= 18; y++) {
        for (x = 0; x <= 18; x++) {
            if (matrix[y][x] == "B" || matrix[y][x] == "W") {
                ctx.beginPath(); //Start path
                ctx.fillStyle = (matrix[y][x] == "W") ? "#ffffff" : "#000000";
                var cercle = new Path2D();
                cercle.moveTo((x * 40) + 20, (y * 40) + 20);
                cercle.arc((x * 40) + 20, (y * 40) + 20, 10, 0, 2 * Math.PI);
                ctx.fill(cercle);
            }
        }
    }
}

export default function drawCoordinates(x, y, ctx) {
    var piece = (player) ? "W" : "B";
    x = x - 20;
    y = y - 20;
    console.log("x = " + x + " y= " + y);

    if ((x % 40 <= 15 || x % 40 >= 25) && (y % 40 <= 15 || y % 40 >= 25)) {
        var xFake = x - ((x % 40 <= 15) ? x % 40 : x % 40 - 40);
        var yFake = y - ((y % 40 <= 15) ? y % 40 : y % 40 - 40);
        if (matrix[(yFake / 40)][(xFake / 40)] == null) {
            matrix[(yFake / 40)][(xFake / 40)] = piece;
            console.log(matrix);
            capture(yFake / 40, xFake / 40, piece);
            drawMatrice(ctx);
            result = checkWin(yFake / 40, xFake / 40, piece); //test();
            player = !player;

            if (player) {
                $('#white').addClass("isSelected");
                $('#black').removeClass('isSelected');
                $('#black').css('animation', '');
            } else {
                $('#black').addClass("isSelected");
                $('#white').removeClass('isSelected');
                $('#white').css('animation', '');
            }
            $('.isSelected').css('animation', 'isSelected 2s ease-out infinite');
            return true;
        }
    }
    drawMatrice(ctx);
}
