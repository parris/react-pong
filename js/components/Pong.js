import gcd from '../utils/math';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactTHREE, {Scene, PerspectiveCamera} from 'react-three';
import THREE from 'three';

import * as GameActions from '../actions/GameActions';
import Ball from './Ball';
import Court from './Court';
import Paddle from './Paddle';
import styles from '../../css/app.css';

const xRatio = 16;
const yRatio = 9;
const aspectratio = xRatio/yRatio;
const boundaries = {
    y1: -120,
    y2: 120,
    x1: -250,
    x2: 250,
};

class Pong extends Component {

    constructor(props) {
        super(props);
        this._boundSize = this.size.bind(this);
        this._boundKey = this.handleKey.bind(this);
        this.actions = bindActionCreators(GameActions, props.dispatch);
        this.state = { windowWidth: 0, };
    }

    componentWillMount() {
        this.size();
    }

    componentDidMount() {
        window.addEventListener('resize', this._boundSize);
        window.addEventListener('keydown', this._boundKey);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._boundSize);
        window.removeEventListener('keydown', this._boundKey);
    }

    handleKey(e) {
        if (e.keyCode === 13 && !this.props.isGameActive) {
            this.actions.startGame();
        }
    }

    size() {
        this.setState({
            windowWidth: window.innerWidth,
        });
    }

    handlePoint(point) {
        if (point === 1) this.actions.givePlayerOnePoint();
        else if (point === 2) this.actions.givePlayerTwoPoint();
        this.actions.endGame();
    }

    render() {
        let cameraprops = {fov:75, aspect:aspectratio, near:1, far:5000,
            position:new THREE.Vector3(0, 0, 200), lookat:new THREE.Vector3(0, 0, 0)};

        // keep the width, but adapt the height to keep a 16/9 aspect ratio
        let height = Math.round((yRatio*this.state.windowWidth)/xRatio);

        return (
            <div>
                <Scene
                    width={this.state.windowWidth}
                    height={height}
                    camera="maincamera"
                >
                    <PerspectiveCamera name="maincamera" {...cameraprops} />

                    <Court
                        playerOneScore={this.props.playerOneScore}
                        playerTwoScore={this.props.playerTwoScore}
                    />

                    <Ball
                        isGameActive={this.props.isGameActive}
                        onBallMove={this.actions.moveBall}
                        onBoundaryHit={this.actions.updateAngle}
                        onPoint={this.handlePoint.bind(this)}
                        boundaries={boundaries}
                        paddleOne={this.props.playerOneY}
                        paddleTwo={this.props.playerTwoY}
                        velocityVector={{
                            x: this.props.speedX,
                            y: this.props.speedY,
                        }}
                        position={{
                            x: this.props.ballX,
                            y: this.props.ballY,
                            z: 0.0,
                        }}
                    />

                    <Paddle
                        player="one"
                        onMove={this.actions.movePlayerOnePaddle}
                        upKey={38}
                        downKey={40}
                        position={{
                            x: 250.5,
                            y: this.props.playerOneY,
                            z: 0.0,
                        }}
                    />

                    <Paddle
                        player="two"
                        onMove={this.actions.movePlayerTwoPaddle}
                        upKey={87}
                        downKey={83}
                        position={{
                            x: -250.5,
                            y: this.props.playerTwoY,
                            z: 0.0,
                        }}
                    />
                </Scene>
            </div>
        );
    }
}

export default connect(state => state.Game)(Pong)
