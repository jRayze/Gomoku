import { getGomokuTools } from "./gomokuTools.js";
import { alertDoubleFreeThree } from "./eventController.js";
import { eatingMachine } from "./gameController.js";

export function setParsing(coordXY){
    var gomokuTools = getGomokuTools();
    var x = coordXY[0];
    var y = coordXY[1];

        if (!freeThreeParse(coordXY)){
            alertDoubleFreeThree();
            return false;
        }
        eatingMachine(verifAllCardinalPoint(coordXY));
        return true;
    }

export function winnerParser(coordXY){
    //                           Y   X                            X   Y
    //    0    ===   Est         0   1  |  2    ===   Sud-est     1   1
    //               Ouest       0  -1  |             Nord-Ouest -1  -1
    //
    //    1    ===   Sud         1   0  |  3    ===   Nord-est   -1   1
    //               Nord       -1   0  |             Sud-Ouest   1  -1
    var cardinalPoint = [[0,1],[1,0],[1,1],[-1,1]];
    var x = parseInt(coordXY[0], 10);
    var y = parseInt(coordXY[1], 10);
    var validation = 0;
    for (let i = 0; i < 4; i++){
        for (let j = 1; j < 5; j++){
            validation += getStoneInfo(x + (j * cardinalPoint[i][1]) ,y + (j * cardinalPoint[i][0])) == 1 ? 1 : 0;
            validation += getStoneInfo(x + (j * (cardinalPoint[i][1] * -1 )) ,y + (j * (cardinalPoint[i][0] * -1 ))) == 1 ? 1 : 0;
        }
    if (validation == 4)
        return true;
    else
        validation = 0;
    }
    return false;
}

function getStoneInfo(x, y) {
    var gomokuTools = getGomokuTools();

    if (verifBorderLimit(y) && verifBorderLimit(x)) {
        if (gomokuTools.stonesArray[y][x].stat == gomokuTools.activePlayer) {
            return 1;                      //ActivePLayer
        }
        else if (gomokuTools.stonesArray[y][x].stat == 'empty') {
            return 0                       //Empty
        }
        else {
            return -1                      //OppositePlayer
        }
    }
    return -2;                             //BorderLimitExceeded
}

function freeThreeParse(coordXY){
    //                           Y   X                            X   Y
    //    0    ===   Est         0   1  |  2    ===   Sud-est     1   1
    //               Ouest       0  -1  |             Nord-Ouest -1  -1
    //
    //    1    ===   Sud         1   0  |  3    ===   Nord-est   -1   1
    //               Nord       -1   0  |             Sud-Ouest   1  -1
    var cardinalPoint = [[0,1],[1,0],[1,1],[-1,1]];
    var direction = [];
    var oppositeDirection = [];
    var validation = 0;
    var x = parseInt(coordXY[0], 10);
    var y = parseInt(coordXY[1], 10);

    for (let j = 0; j < 4; j++){
        for (let i = 0; i < 4; i++){
            direction.push(getStoneInfo(x + ((1+i) * cardinalPoint[j][1]) ,y + ((1+i) * cardinalPoint[j][0])));
            oppositeDirection.push(getStoneInfo(x + ((1+i) * (cardinalPoint[j][1] * -1 )) ,y + ((1+i) * (cardinalPoint[j][0] * -1 )) ));
        }
        validation += doubleFreeThree(direction, oppositeDirection);
        direction = [];
        oppositeDirection = [];
    }
    if (validation >= 2)
        return false;
    return true;
}

function doubleFreeThree(direction, oppositeDirection){
    if (direction[0] < 0 || oppositeDirection[0] < 0)
        return 0;
    if (direction[0] == 1) {
        if (direction[1] == 1)
            if (direction[2] == 0 && oppositeDirection[0] == 0)
                return 1;
        else if (direction[1] == 0)
            if ((oppositeDirection[0] == 1 && oppositeDirection[1] == 0) || (direction[2] == 1 && direction[3] == 0 && oppositeDirection[0] == 0 ) || ( oppositeDirection[0] == 0 && oppositeDirection[1] == 1 && oppositeDirection[2] == 0))
                return 1;
    }
    if (direction[0] == 0) {
        if (direction[1] == 1)
            if ((direction[2] == 0 && oppositeDirection[0] == 1 && oppositeDirection[1] == 0) || direction[2] == 1 && direction[3] == 0 && oppositeDirection[0] == 0)
                return 1;
        if (oppositeDirection[0] == 1)
            if ((oppositeDirection[1] == 0 && oppositeDirection[2] == 1 && oppositeDirection[3] == 0) || oppositeDirection[1] == 1 && oppositeDirection[2] == 0)
                return 1;
        if (oppositeDirection[0] == 0 && oppositeDirection[1] == 1 && oppositeDirection[2] == 1 && oppositeDirection[3] == 0) 
            return 1;
    }
    return (0);
}

function verifBorderLimit(number){
    if ((number <= 18) && (number >= 0))
        return true;
    return false
}

function eatOrNot(coordXY, cardinalPoint){
    var gomokuTools = getGomokuTools();
    var oppositePlayer = (gomokuTools.activePlayer == "black") ? "white" : "black";
    var validation = 0;
    // cardinalPoint X and Y
    var cardPY = cardinalPoint[0];
    var cardPX = cardinalPoint[1];
    var x = parseInt(coordXY[0], 10);
    var y = parseInt(coordXY[1], 10);

    if (verifBorderLimit(y + (1 * cardPY)) && verifBorderLimit(x + (1 * cardPX)))
        if (gomokuTools.stonesArray[y + (1 * cardPY)][x + (1 * cardPX)].stat == oppositePlayer)
            validation++;
    if (verifBorderLimit(y + (2 * cardPY)) && verifBorderLimit(x + (2 * cardPX)))
        if (gomokuTools.stonesArray[y + (2 * cardPY)][x + (2 * cardPX)].stat == oppositePlayer)
            validation++;
    if (verifBorderLimit(y + (3 * cardPY)) && verifBorderLimit(x + (3 * cardPX)))
        if (gomokuTools.stonesArray[y + (3 * cardPY)][x + (3 * cardPX)].stat == gomokuTools.activePlayer)
            validation++;
    return ((validation == 3) ? true : false);
}

function verifAllCardinalPoint(coordXY){
    //                    Y   X                             Y   X
    // Est        : 0  |  0   1          Nord-Ouest : 4  | -1  -1
    // Ouest      : 1  |  0  -1          Sud-Ouest  : 5  |  1  -1
    // Nord       : 2  | -1   0          Nord-Est   : 6  | -1   1
    // Sud        : 3  |  1   0          Sud-Est    : 7  |  1   1

    var cardinalPoint = [[0,1],[0,-1],[-1,0],[1,0],[-1,-1],[1,-1],[-1,1],[1, 1]];
    var eatenStones = [];
    var x = parseInt(coordXY[0], 10);
    var y = parseInt(coordXY[1], 10);

    for (let i = 0; i < 8; i++){
            if (eatOrNot(coordXY, cardinalPoint[i])){
                eatenStones.push([y + (1 * cardinalPoint[i][0]), x + (1 * cardinalPoint[i][1])]);
                eatenStones.push([y + (2 * cardinalPoint[i][0]), x + (2 * cardinalPoint[i][1])]);
            }
        }
        return eatenStones;
    }
    