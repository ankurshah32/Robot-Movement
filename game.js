import { Matrix, HURDDLE } from './model.js';

export class Game {
    matrix = [];
    angles = [0, 90, 180, 270, 360];
    constructor(){
        this.InitializeGame();
    }
    InitializeGame() {
        const container = document.getElementById("container");
        this.makeRows(16, 16);
        this.addRock(16, 16, 16);
        this.addHole(16, 16, 16);
        this.addSpinner(16, 16, 16);
        console.log(this.matrix);
    }
    makeRows(rows, cols) {
        container.style.setProperty('--grid-rows', rows);
        container.style.setProperty('--grid-cols', cols);
        let k = 0;
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = []
            for (let j = 0; j < cols; j++) {
                k += 1;
                let cell = document.createElement("div");
                cell.innerHTML = '<span></span>';
                cell.id = k;
                cell.dataset.x = i;
                cell.dataset.y = j;
                this.matrix[i][j] = new Matrix();
                this.matrix[i][j].cellId = k;
                container.appendChild(cell).className = "grid-item";
            }
        }
    };
    addRock(maxNumOfHurdle, rows, cols) {
        for (let c = 0; c < maxNumOfHurdle; c++) {
            const randomValue = Math.floor(Math.random() * (rows*cols));
            let cell = document.getElementById(randomValue.toString());
            if(cell){
                const i = parseInt(cell.dataset.x);
                const j = parseInt(cell.dataset.y);
                this.matrix[i][j].hurddle = HURDDLE.ROCK;
                cell.style = "background: grey";
            }
        }
    };
    addHole(maxNumOfHurdle, rows, cols) {
        let prevCell = undefined;
        for (let c = 0; c < maxNumOfHurdle; c++) {
            const randomValue = Math.floor(Math.random() * (rows*cols));
            let cell = document.getElementById(randomValue.toString());
            if(cell){
                let x, y;
                cell.style = "background: chocolate";
                cell.dataset.hole = cell.id;
                if(prevCell){
                    const x = parseInt(cell.dataset.x)
                    const y = parseInt(cell.dataset.y)
                    const i = parseInt(prevCell.dataset.x);
                    const j = parseInt(prevCell.dataset.y);
                    cell.dataset.connectedHole = prevCell.id;
                    this.matrix[i][j].hurddle = HURDDLE.HOLE 
                    this.matrix[i][j].connectedHole = {'x': x , 'y': y} ;
                    this.matrix[x][y].hurddle = HURDDLE.HOLE 
                    this.matrix[x][y].connectedHole = {'x': i, 'y': j} ;
                    prevCell = undefined;
                } else {
                    prevCell = cell;
                }

            }
        }
    };
    addSpinner(maxNumOfHurdle, rows, cols) {
        for (let c = 0; c < maxNumOfHurdle; c++) {
            const randomValue = Math.floor(Math.random() * (rows*cols));
            let cell = document.getElementById(randomValue.toString());
            if(cell && !cell.dataset.hole){
                const i = parseInt(cell.dataset.x);
                const j = parseInt(cell.dataset.y);
                cell.style = "background: cornflowerblue";
                const rotation =this.angles[Math.floor(Math.random() * this.angles.length)];;
                cell.dataset.rotation = rotation;
                //cell.innerText = rotation;
                this.matrix[i][j].hurddle = HURDDLE.SPINNER;
                this.matrix[i][j].rotation = rotation;
            }
        }
    }
    update(position, arrowHead){
        const id = this.matrix[position.x][position.y].cellId;
        const cell = document.getElementById(id);
        cell.innerHTML = `<span>${arrowHead}</span>`;
    }
}

