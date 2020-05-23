import {ARROW } from './model.js';
export class Robot{
    position;
    arrowDirection;
    constructor(position, arrow){
        this.arrowDirection = arrow;
        this.position = position;
    }
    turnRobo(command){
        status = 0;
        switch(command){
            case 'L':
                this.arrowDirection = ARROW.LEFT;
                status = 1;
                break;
            case 'R':
                this.arrowDirection = ARROW.RIGHT;
                status = 1;
                break;
            case 'U':
                this.arrowDirection = ARROW.UP;
                status = 1;
                break;
            case 'D':
                this.arrowDirection = ARROW.DOWN;
                status = 1;
                break;
        }
        return status;
    }

    followCommands(commands, callback){
        [...commands].map(command=>{
            setTimeout(()=>{
                let status = this.turnRobo(command);
                if(parseInt(status) === 0){
                    this.position = this.moveRobo(this.position);
                }
                callback(this.position, this.arrowDirection);
            },2000);
        });
    }

    moveRobo(position){
        switch(this.arrowDirection){
            case ARROW.LEFT:
                position.x = position.x;
                position.y = position.y - 1;
                break;
            case ARROW.RIGHT:
                position.x = position.x;
                position.y = position.y + 1;
                break;
            case ARROW.UP:
                position.x = position.x - 1;
                position.y = position.y;
                break;
            case ARROW.DOWN:
                position.x = position.x + 1;
                position.y = position.y;
                break;
        }
        return position;
    }
}

