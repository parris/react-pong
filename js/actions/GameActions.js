import * as ActionTypes from '../constants/ActionTypes';

export function movePlayerOnePaddle(y) {
    return {
        type: ActionTypes.MOVE_PADDLE_ONE,
        y,
    };
}

export function movePlayerTwoPaddle(y) {
    return {
        type: ActionTypes.MOVE_PADDLE_TWO,
        y,
    };
}

export function updateAngle() {
    return {
        type: ActionTypes.UPDATE_ANGLE,
    };
}


export function moveBall(x, y) {
    return {
        type: ActionTypes.MOVE_BALL,
        x,
        y,
    };
}

export function givePlayerOnePoint() {
    return {
        type: ActionTypes.POINT_PLAYER_ONE
    };
}

export function givePlayerTwoPoint() {
    return {
        type: ActionTypes.POINT_PLAYER_TWO
    };
}

export function startGame() {
    return {
        type: ActionTypes.START_GAME
    };
}


export function endGame() {
    return {
        type: ActionTypes.END_GAME
    };
}
