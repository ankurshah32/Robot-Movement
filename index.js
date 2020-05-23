import { Robot } from './robot.js';
import { Game } from './game.js';
import {ARROW, HURDDLE} from './model.js';
var game = new Game();

var InitialPostion = {x: 0, y: 0};
var commands = "MMMDDMMM";
var robot = new Robot(InitialPostion, ARROW.RIGHT);
const arrayOfCommands = [...commands];
for(const command of arrayOfCommands){
    let isValidPos = true;
    robot.followCommands(command, game.matrix, (position, direction)=>{
        if(position === undefined){
            alert("Wrong movement");
        } else {
            checkForHurddle(position, direction)
            game.update(position, direction);

        }
    });
}

function checkForHurddle(position, direction){
    const matPos = game.matrix[position.x][position.y];
    switch(matPos.hurddle) {
        case HURDDLE.ROCK:
            alert("You have Rock in front of you cannot move in that direction");
            break;
        case HURDDLE.HOLE:
            position.x = matPos.connectedHole.x;
            position.y = matPos.connectedHole.y;
            break;
        case HURDDLE.SPINNER:
            rotation = matPos.rotation;
            if(rotation !== 0 && rotation !== 360){
                let rotateDirection = rotateRobo(direction);
                let i = 0;
                do {
                    robot.turnRobo(rotateDirection[i])
                    rotation = rotation - 90;
                    i++;
                } while(rotation !== 0)
            }
            break;
    }
}
function rotateRobo (direction){
    let turnCommandArray = []
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
}
console.dir(robot);



