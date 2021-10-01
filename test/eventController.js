import { getGomokuTools } from "./gomokuTools.js";
import { setGame }    from "./gameController.js";

    
export function playerMovement(){
    var gomokuTools = getGomokuTools();
    for (var y = 0; y < 19; y++ ) {
        for (var x = 0; x < 19; x++ ) {
            gomokuTools.stonesArray[y][x].stoneHtmlElement.addEventListener("mousedown", function () {
                setGame(getCellCoord(this.id));
            });
        }        
    }
}

export function playerMovementPreview(){
    var gomokuTools = getGomokuTools();
    for (var y = 0; y < 19; y++ ) {
        for (var x = 0; x < 19; x++ ) {
            gomokuTools.stonesArray[y][x].stoneHtmlElement.addEventListener("mouseenter", function () {
                if (this.style.opacity != 1) {
                        this.style.opacity = 0.5;
                        this.style.backgroundColor = getActivePlayer();
                        // ADD ANIMATION ccs
                    }
            })
            gomokuTools.stonesArray[y][x].stoneHtmlElement.addEventListener("mouseleave", function () { 
                if (this.style.opacity != 1) {
                    this.style.opacity = 0;
                        // ADD ANIMATION ccs
                    }
            });
        }
    }
}

//         A REFAIRE SI POSSIBLE   ////////////////////////
export function stonesHeaderAnimation(){
    var gomokuTools = getGomokuTools();
    if (gomokuTools.activePlayer == 'white') {
        $('#white').addClass("isSelected");
        $('#black').removeClass('isSelected');
        $('#black').css('animation', '');
    } else {
        $('#black').addClass("isSelected");
        $('#white').removeClass('isSelected');
        $('#white').css('animation', '');
    }
    $('.isSelected').css('animation', 'isSelected 2s ease-out infinite');
    }
    
export function alertDoubleFree(){
        $('#zone').prepend('<div class="alert alert-danger" role="alert">Double 3 libres : Coup interdit !</div>');
        setTimeout(function() {
            $('.alert').remove();
        }, 3000);
}


// AFFICHAGE DES PAIRE CASSEE///////////////////////////////////////

export function displayEatenStoneNumber(){
    var gomokuTools = getGomokuTools();
    if (gomokuTools.activePlayer == 'white') {
        $('.nbPieceB').html(gomokuTools.eatenBlackStones);
        // AFFICHAGE DES PAIRE CASSEE/////////////////////////////////////////
        $('.nbPairesB').html(gomokuTools.eatenBlackStones / 2);
    }
    else if (gomokuTools.activePlayer == 'black') {
        $('.nbPieceW').html(gomokuTools.eatenWhiteStones);
        // AFFICHAGE DES PAIRE CASSEE/////////////////////////////////////////
        $('.nbPairesW').html(gomokuTools.eatenWhiteStones / 2);
    }
}
/////////////////////////////////////////////////////////////

function getActivePlayer(){
    var gomokuTools = getGomokuTools();
    return (gomokuTools.activePlayer);
}

function getCellCoord(coord){
    return coord.match(/[0-9]+/gm);
}