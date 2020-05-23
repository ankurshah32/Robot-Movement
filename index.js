import { Robot } from './robot.js';
import { Game } from './game.js';
import {ARROW} from './model.js';
var game = new Game();

var InitialPostion = {x: 0, y: 0}
var robot = new Robot(InitialPostion, ARROW.RIGHT);
robot.followCommands("MMMDDMMM", (position, direction)=>{
    console.log("position");
    console.log(position);
    console.log('Direction');
    console.log(direction);
    console.dir(game);
    
    game.update(position, direction);
})
console.dir(robot);



