import { stonesHeaderAnimation } from "./eventController.js";
import { stoneClass } from "./stoneClass.js";
import { getGomokuTools } from "./gomokuTools.js";
import { setParsing } from "./parsingClass.js";
import { displayEatenStoneNumber } from "./eventController.js";

export function setGame(coordXY){
    var gomokuTools = getGomokuTools();
    var x = coordXY[0];
    var y = coordXY[1];

    if (gomokuTools.stonesArray[y][x].stat == 'empty') {
        if (setParsing(coordXY)) {
            gomokuTools.stonesArray[y][x].addStone(gomokuTools.activePlayer);
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

//       A REFAIRE SI POSSIBLE ////////////////
function createBoard() {
    $('#zone').html('<table id="board"></table>')
    for (var y = 0; y < 19; y++ ) {
        $('#board').append('<tr id="line'+y+'">')
        for (var x = 0; x < 19; x++ ) {
            $('#line'+y).append('<td id="col'+y+'-'+x+'"><div id="cercle'+x+'-'+y+'" class="cercle"></div></td>')
        }
    }
    $('td .cercle').css('opacity', '0');
}
//////////////////////////////////////////////

function createStonesArray(){
    var stonesArray = [];

    for (var i = 0; i < 19; i++) {
        stonesArray[i] = new Array(19);
    }
    for (var y = 0; y < 19; y++) {
        for (var x = 0; x < 19; x++ ) {
            stonesArray[y][x] = new stoneClass(document.getElementById("cercle"+x+"-"+y));
        }
    }
    return (stonesArray); 
}