import { Robot } from './robot.js';
import { Game } from './game.js';
import {ARROW, HURDDLE} from './model.js';
var game = new Game();
//var InitialPostion = {x: 0, y: 0};
//var commands = "MMMDDMMM";


document.getElementById("submit").addEventListener("click", moveAllCommands);
function moveAllCommands(){
    var x = parseInt (document.getElementById("InitialX").value);
    var y = parseInt (document.getElementById("InitialY").value);
    var commands = document.getElementById("Commands").value;
    var InitialPostion = {x: x, y: y};
    var robot = new Robot(InitialPostion, ARROW.RIGHT);
    const arrayOfCommands = [...commands];
    for(const command of arrayOfCommands){
        let isValidPos = true;
        robot.followCommands(command, game.matrix, ()=>{
            if(robot.position === undefined){
                alert("Wrong movement");
            } else {
                checkForHurddle(robot)
                game.update(robot.position, robot.arrowDirection);

            }
        });
    }
}
function checkForHurddle(robot){
    const matPos = game.matrix[robot.position.x][robot.position.y];
    switch(matPos.hurddle) {
        case HURDDLE.ROCK:
            alert("You have Rock in front of you cannot move in that direction");
            break;
        case HURDDLE.HOLE:
            robot.position.x = matPos.connectedHole.x;
            robot.position.y = matPos.connectedHole.y;
            break;
        case HURDDLE.SPINNER:
            let rotation = matPos.rotation;
            if(rotation !== 0 && rotation !== 360){
                let rotateDirection = rotateRobo(robot.arrowDirection);
                let i = 0;
                do {
                    robot.turnRobo(rotateDirection[i]);
                    rotation = rotation - 90;
                    i++;
                } while(rotation !== 0)
                //game.update(position, direction);
                
            }
            break;
    }
    return ;
}
function rotateRobo (direction){
    let turnCommandArray = ['X'];
    switch(direction){
        case ARROW.UP:
            turnCommandArray = ['R','D', 'L'];
            break;
        case ARROW.RIGHT:
            turnCommandArray = ['D','L', 'U'];
            break;
        case ARROW.DOWN:
            turnCommandArray = ['L','U', 'R'];
            break;
        case ARROW.LEFT:
            turnCommandArray = ['U','R', 'D'];
            break;
    }
    return turnCommandArray;
}




