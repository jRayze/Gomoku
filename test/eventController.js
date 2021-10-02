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
    
export function alertDoubleFreeThree(){
        $('#zone').append('<div class="alert alert-danger" role="alert">Double 3 libres : Coup interdit !</div>');
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


function checkArround(y, x, p, direction, board) {
    //  console.log(board)
      //direction = {vertical : 1, horizontal : 2, diagonale1 : 3, diagonale2: 4}
    if (this.checkType(y, x, p, board) == 0) {
          return true;
    }
    if (direction != 1) {
          /*console.log("en haut il y a = "+matrix[y - 1][x]+" en bas il y a = "+matrix[y + 1][x]+"encore en bas il y a = "+matrix[y + 2][x])
           console.log("en haut il y a = "+matrix[y - 1][x]+" en bas il y a = "+matrix[y + 1][x]+" en h + 2 il y a = "+matrix[y - 2][x])*/
          if (this.checkType(y + 1, x, p, board) == 1 && ((this.checkType(y + 2, x, p, board) == 2 && this.checkType(y - 1, x, p, board) == 0) || (this.checkType(y + 2, x, p, board) == 0 && this.checkType(y - 1, x, p, board) == 2))) {
           //   console.log("ca return vrai 1");
              return true;
          }
          else if (this.checkType(y - 1, x, p, board) == 1  && ((this.checkType(y - 2, x, p, board) == 2 && this.checkType(y + 1, x, p, board) == 0) ||(this.checkType(y - 2, x, p, board) == 0 && this.checkType(y + 1, x, p, board) == 2))) {
             // console.log("x = "+x+" et y = "+y);
             // console.log("vrai 2 - 2");
              return true;
          }
    }
    if (direction != 2) {
         /* console.log("y = " + y + " x = " + x);
          console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])*/
          if (this.checkType(y, x + 1, p, board) == 1 && ((this.checkType(y, x + 2, p, board) == 2 && this.checkType(y, x - 1, p, board) == 0) || (this.checkType(y, x + 2, p, board) == 0 && this.checkType(y, x - 1, p, board) == 2))) {
             // console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])
             // console.log("ca return vrai 3");
              return true;
          }
          else if (this.checkType(y, x - 1, p, board) == 1 && ((this.checkType(y, x - 2, p, board) == 2 && this.checkType(y, x + 1, p, board) == 0) || (this.checkType(y, x - 2, p, board) == 0 && this.checkType(y, x + 1, p, board) == 2))) {
           //   console.log("a gauche il y a = " + matrix[y][x - 1] + "encore à gauche il y a = " + matrix[y][x - 2] + " et à droite il y a = " + matrix[y][x + 1])
              //console.log("ca return vrai 4");
              return true;
          }
    }
    if (direction != 3) {
          if (this.checkType(y - 1, x + 1, p, board) == 1 && ((this.checkType(y - 2, x + 2, p, board) == 2 && this.checkType(y + 1, x - 1, p, board) == 0) || (this.checkType(y - 2, x + 2, p, board) == 0 && this.checkType(y + 1, x - 1, p, board) == 2))) {
            //  console.log("ca return vrai 5");
              return true;
        }
          else if (this.checkType(y + 1, x - 1, p, board) == 1 && ((this.checkType(y + 2, x - 2, p, board) == 2 && this.checkType(y - 1, x + 1, p, board) == 0) || (this.checkType(y + 2, x - 2, p, board) == 0 && this.checkType(y - 1, x + 1, p, board) == 2))) {
            //  console.log("ca return vrai 6");
              return true;
        }
    }
    if (direction != 4) {
          if (this.checkType(y - 1, x - 1, p, board) == 1 && ((this.checkType(y - 2, x - 2, p, board) == 2 && this.checkType(y + 1, x + 1, p, board) == 0) || (this.checkType(y - 2, x - 2, p, board) == 0 && this.checkType(y + 1, x + 1, p, board) == 2))) {
            //  console.log("ca return vrai 7");
              return true;
          }
          else if (this.checkType(y + 1, x + 1, p, board) == 1 && ((this.checkType(y + 2, x + 2, p, board) == 2 && this.checkType(y - 1, x - 1, p, board) == 0) || (this.checkType(y + 2, x + 2, p, board) == 0 && this.checkType(y - 1, x - 1, p, board) == 2))) {
             // console.log("ca return vrai 8");
              return true;
          }
    }
      return false;
}


function checkWinner(board) {
      for (var y = 0; y <= 18; y++) {
          for (var x = 0; x <= 18; x++) {
              for (var dir = 1; dir <= 4; dir++) {
                  if (dir == 1) {
                      if (y <= 14) {
                          switch (board[y][x]) {
                              case 0:
                                  break;
                              case 1:
                                  if (board[y + 1][x] == 1 && board[y + 2 ][x] == 1 && board[y + 3][x] == 1 && board[y + 4][x] == 1)
                                      if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y + 1, x, 1, dir, board) && !this.checkArround(y + 2, x, 1, dir, board) && !this.checkArround(y + 3, x, 1, dir, board) && !this.checkArround(y + 4, x, 1, dir, board))
                                          return true;
                                  break;
                              case 2:
                                  if (board[y + 1][x] == 2 && board[y + 2][x] == 2 && board[y + 3][x] == 2 && board[y + 4][x] == 2)
                                      if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y + 1, x, 2, dir, board) && !this.checkArround(y + 2, x, 2, dir, board) && !this.checkArround(y + 3, x, 2, dir, board) && !this.checkArround(y + 4, x, 2, dir, board))
                                          return true;
                                  break;
                          }
                      }
                  }
                  if (dir == 2) {
                      if (x <= 14) {
                          switch (board[y][x]) {
                              case 0:
                                  break;
                              case 1:   
                                  if (board[y][x + 1] == 1 && board[y][x + 2] == 1 && board[y][x + 3] == 1 && board[y][x + 4] == 1){
                                      if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y, x + 1, 1, dir, board) && !this.checkArround(y, x + 2, 1, dir, board) && !this.checkArround(y, x + 3, 1, dir, board) && !this.checkArround(y, x + 4, 1, dir, board))
                                          return true;
                                  }
                                  break;
                              case 2:
                                  if (board[y][x + 1] == 2 && board[y][x + 2] == 2 && board[y][x + 3] == 2 && board[y][x + 4] == 2) {
                                      if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y, x + 1, 2, dir, board) && !this.checkArround(y, x + 2, 2, dir, board) && !this.checkArround(y, x + 3, 2, dir, board) && !this.checkArround(y, x + 4, 2, dir, board)){
                                          return true;
                                      }
                                  }
                                  break;
                          }
                      }
                  }
                  if (dir == 3) {
                      if (y >= 4 && x <= 14) {
                          switch (board[y][x]) {
                              case 0:
                                  break;
                              case 1:
                                  if (board[y - 1][x + 1] == 1 && board[y - 2][x + 2] == 1 && board[y - 3][x + 3] == 1 && board[y - 3][x + 4] == 1)
                                      if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y - 1, x + 1, 1, dir, board) && !this.checkArround(y - 2, x + 2, 1, dir, board) && !this.checkArround(y - 3, x + 3, 1, dir, board) && !this.checkArround(y - 4, x + 4, 1, dir, board))
                                          return true;
                                  break;
                              case 2:
                                  if (board[y - 1][x + 1] == 2 && board[y - 2][x + 2] == 2 && board[y - 3][x + 3] == 2 && board[y - 4][x + 4] == 2)
                                      if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y - 1, x + 1, 2, dir, board) && !this.checkArround(y - 2, x + 2, 2, dir, board) && !this.checkArround(y - 3, x + 3, 2, dir, board) && !this.checkArround(y - 4, x + 4, 2, dir, board))
                                          return true;
                                  break;
                          }
                      }
                  }
                  if (dir == 4) {
                      if (x <= 14 && y <= 14) {
                          switch (board[y][x]) {
                              case 0:
                                  break;
                              case 1:
                                  if (board[y + 1][x + 1] == 1 && board[y + 2][x + 2] == 1 && board[y + 3][x + 3] == 1 && board[y + 3][x + 4] == 1)
                                      if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y + 1, x + 1, 1, dir, board) && !this.checkArround(y + 2, x + 2, 1, dir, board) && !this.checkArround(y + 3, x + 3, 1, dir, board) && !this.checkArround(y + 4, x + 4, 1, dir, board))
                                          return true;
                                  break;
                              case 2:
                                  if (board[y + 1][x + 1] == 2 && board[y + 2][x + 2] == 2 && board[y + 3][x + 3] == 2 && board[y + 4][x + 4] == 2)
                                      if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y + 1, x + 1, 2, dir, board) && !this.checkArround(y + 2, x + 2, 2, dir, board) && !this.checkArround(y + 3, x + 3, 2, dir, board) && !this.checkArround(y + 4, x + 4, 2, dir, board))
                                          return true;
                                  break;
                            }
                        }
                    }
                }
            }
        }
      return false;
}