import { stonesHeaderAnimation } from "./eventController.js";
import { stoneClass } from "./stoneClass.js";
import { getGomokuTools } from "./gomokuTools.js";
import { setParsing, winnerParser } from "./parsingController.js";
import { displayEatenStoneNumber } from "./eventController.js";

export function setGame(coordXY){
    var gomokuTools = getGomokuTools();
    var x = coordXY[1];
    var y = coordXY[0];

    if (gomokuTools.stonesArray[y][x].stat == 'empty') {
        if (setParsing(coordXY)) {
            gomokuTools.stonesArray[y][x].addStone(gomokuTools.activePlayer);
            
            if(winnerParser(coordXY)){
                console.log("WINNNNN");
                resetGame();
            }
            switchActivePlayer();
            stonesHeaderAnimation();
        }
    }
}

export function initGame(){
    let gomokuTools = getGomokuTools();
    createBoard();
    gomokuTools.stonesArray = createStonesArray();
    gomokuTools.activePlayer = 'black';
    gomokuTools.eatenBlackStones = 0;
    gomokuTools.eatenWhiteStones = 0;
    gomokuTools.winnablePosition = [];
}

function resetGame(){
    let gomokuTools = getGomokuTools();

    for (let i = 0; i < 19; i++){
        for (let j = 0; j < 19; j++){
            gomokuTools.stonesArray[i][j].removeStone();
        }
    }
    gomokuTools.activePlayer = 'black';
    gomokuTools.eatenBlackStones = 0;
    gomokuTools.eatenWhiteStones = 0;
    gomokuTools.winnablePosition = [];
    displayEatenStoneNumber();
    stonesHeaderAnimation();
}
export function eatingMachine(eatenStonesCoord)
{
    var gomokuTools = getGomokuTools();
    
    eatenStonesCoord.forEach(coord => {
        gomokuTools.stonesArray[coord[0]][coord[1]].removeStone();
        if (gomokuTools.activePlayer == 'white')
            gomokuTools.eatenBlackStones += 1;
        else
            gomokuTools.eatenWhiteStones += 1;   
    });
    displayEatenStoneNumber();
}

function switchActivePlayer(){
    var gomokuTools = getGomokuTools();
    gomokuTools.activePlayer = (gomokuTools.activePlayer == 'black') ? 'white' : 'black';
}

function createBoard() {
    $('#zone').html('<table id="board"></table>')
    for (var y = 0; y < 19; y++ ) {
        $('#board').append('<tr id="line'+y+'">')
        for (var x = 0; x < 19; x++ ) {
            $('#line'+y).append('<td id="col'+y+'-'+x+'"><div id="cercle'+y+'-'+x+'" class="cercle"></div></td>')
            $('#col'+y+'-'+x+' .cercle').attr('data-content', "y{"+y+"},x{"+x+"}");
        }
    }
    $('td .cercle').css('opacity', '0');
}

function createStonesArray(){
    var stonesArray = [];

    for (var i = 0; i < 19; i++) {
        stonesArray[i] = new Array(19);
    }
    for (var y = 0; y < 19; y++) {
        for (var x = 0; x < 19; x++ ) {
            stonesArray[y][x] = new stoneClass(document.getElementById("cercle"+y+"-"+x));
            //$(stonesArray[y][x]).attr('data-content', "y{"+y+"},x{"+x+"}");
            console.log($(stonesArray[y][x]));
        }
    }
    return (stonesArray); 
}