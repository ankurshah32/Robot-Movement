import {ARROW } from './model.js';
export class Robot{
    position;
    arrowDirection;
    constructor(position, arrow){
        this.arrowDirection = arrow;
        this.position = position;
    }
    turnRobo(command){
        let status = true;
        switch(command){
            case 'L':
                this.arrowDirection = ARROW.LEFT;
                status = false;
                break;
            case 'R':
                this.arrowDirection = ARROW.RIGHT;
                status = false;
                break;
            case 'U':
                this.arrowDirection = ARROW.UP;
                status = false;
                break;
            case 'D':
                this.arrowDirection = ARROW.DOWN;
                status = false;
                break;
        }
        return status;
    }

    followCommands(command, gameMatrix, callback){
        if(this.position) {
            if(this.turnRobo(command)){
                this.position = this.moveRobo(this.position, gameMatrix);
            }
            callback(this.position, this.arrowDirection);
        }
    }

    moveRobo(position, gameMatrix){
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
        if (!this.isValidPosition(position, gameMatrix)){
            return undefined;
        }
        return position;
    }
    isValidPosition(position, gameMatrix){
        try{
            const id = gameMatrix[position.x][position.y].cellId;
        }
        catch{
            return false;
        }
        return true;
    }
}

