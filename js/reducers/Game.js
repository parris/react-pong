import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
    'ballX': 0.0,
    'ballY': 0.0,
    'speedX': 0.0,
    'speedY': 0.0,
    'playerOneY': 0,
    'playerTwoY': 0,
    'isGameActive': false,
    'playerOneScore': 0,
    'playerTwoScore': 0,
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.MOVE_BALL:
            return {...state, ballX: action.x, ballY: action.y,};
        case ActionTypes.POINT_PLAYER_ONE:
            return {...state, playerOneScore: state.playerOneScore + 1};
        case ActionTypes.POINT_PLAYER_TWO:
            return {...state, playerTwoScore: state.playerTwoScore + 1};
        case ActionTypes.MOVE_PADDLE_ONE:
            return {...state, playerOneY: action.y,};
        case ActionTypes.MOVE_PADDLE_TWO:
            return {...state, playerTwoY: action.y,};
        case ActionTypes.UPDATE_ANGLE:
            let speedX = state.speedX;
            let speedY = state.speedY;
            if (speedX > 0 && speedY > 0) speedY *= -1; // going tl, now bl
            else if (speedX > 0 && speedY < 0) speedX *= -1; // going bl, now br
            else if (speedX < 0 && speedY < 0) speedY *= -1; // going br, now tr
            else if (speedX < 0 && speedY > 0) speedX *= -1; // going tr, now tl
            return {...state, speedX, speedY};
        case ActionTypes.START_GAME:
            return {...state, isGameActive: true, speedX: 2.0, speedY: 2.0};
        case ActionTypes.END_GAME:
            return {...state, isGameActive: false, ballX: 0.0, ballY: 0.0, speedX: 0.0, speedY: 0.0};
        default:
            return state;
    }
}
