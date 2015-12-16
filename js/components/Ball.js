import React, {Component} from 'react';
import {Mesh} from 'react-three';
import THREE from 'three';

let ballGeometry = new THREE.SphereGeometry(3, 32, 32);
let ballMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});


class Ball extends Component {

    constructor(props) {
        super(props);
        this._boundGameLoop = this.gameLoop.bind(this);
    }

    componentWillMount() {
        this._boundGameLoop();
    }

    hasHitAVerticalBoundary() {
        if (
            this.props.position.y < this.props.boundaries.y1 ||
            this.props.position.y > this.props.boundaries.y2
        ) {
            return true;
        }

        return false;
    }

    hasHitAPaddle() {
        let topOfPaddleOne = this.props.paddleOne - 15;
        let bottomOfPaddleOne = this.props.paddleOne + 15;
        let isPaddleOneAlignedWithBall = (
            this.props.position.y >= topOfPaddleOne &&
            this.props.position.y <= bottomOfPaddleOne
        );

        let topOfPaddleTwo = this.props.paddleTwo - 15;
        let bottomOfPaddleTwo = this.props.paddleTwo + 15;
        let isPaddleTwoAlignedWithBall = (
            this.props.position.y >= topOfPaddleTwo &&
            this.props.position.y <= bottomOfPaddleTwo
        );

        if (
            (this.props.position.x < this.props.boundaries.x1 && isPaddleOneAlignedWithBall) ||
            (this.props.position.x > this.props.boundaries.x2 && isPaddleTwoAlignedWithBall)
        ) {
            return true;
        }

        return false;
    }

    hasHitAHorizontalBoundary() {
        if (this.props.position.x < this.props.boundaries.x1) {
            return 2;
        }

        if (this.props.position.x > this.props.boundaries.x2) {
            return 1;
        }

        return false;
    }

    gameLoop() {
        if (this.props.isGameActive) {
            if (
                this.hasHitAVerticalBoundary() ||
                this.hasHitAPaddle()
            ) {
                this.props.onBoundaryHit();
            } else {
                let point = this.hasHitAHorizontalBoundary();
                if (point) {
                    this.props.onPoint(point);
                }
            }

            this.props.onBallMove(
                this.props.position.x + this.props.velocityVector.x,
                this.props.position.y + this.props.velocityVector.y,
            );
        }
        requestAnimationFrame(this._boundGameLoop);
    }

    render() {
        return (
            <Mesh
                geometry={ballGeometry}
                material={ballMaterial}
                position={this.props.position}
            />
        );
    }
}

export default Ball;
