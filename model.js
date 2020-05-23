export const ARROW = {
    LEFT: '&#8592',
    UP: '&#8593;',
    RIGHT: '&#8594;',
    DOWN: '&#8595;'
}
export const HURDDLE = {
    ROCK: 'ROCK',
    HOLE: 'HOLE',
    SPINNER: 'SPINNER'
}
export const DIRECTION  = {
    UP: 'UP',
    DOWN: 'DOWN',
    FORWARD: 'FORWARD',
    BACKWARD: 'BACKWARD'
}
export class Matrix {
    hurddle;
    connectedHole;
    rotation;
    cellId;
}