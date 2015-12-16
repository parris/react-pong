import React, {Component} from 'react';
import {Mesh} from 'react-three';
import THREE from 'three';

let paddleGeometry = new THREE.PlaneGeometry(4, 30, 32);
let paddleMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});


class Paddle extends Component {

    constructor(props) {
        super(props);
        this._boundKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this._boundKey);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._boundKey);
    }

    handleKey(e) {
        if (e.keyCode === this.props.downKey && this.props.position.y > -100) {
            this.props.onMove(this.props.position.y - 10);
        }

        if (e.keyCode === this.props.upKey && this.props.position.y < 100) {
            this.props.onMove(this.props.position.y + 10);
        }
    }

    render() {
        return (
            <Mesh
                geometry={paddleGeometry}
                material={paddleMaterial}
                position={this.props.position}
            />
        );
    }
}

export default Paddle;
