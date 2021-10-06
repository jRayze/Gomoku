import { playerMovement, playerMovementPreview } from "./eventController.js";
import { initGame } from "./gameController.js"

start();

function start(){
    // Game Init    
    initGame(); 

    // Event Init    
    playerMovement();
    playerMovementPreview();
}    


