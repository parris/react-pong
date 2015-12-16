import React, {Component} from 'react';
import {Object3D, Mesh} from 'react-three';
import THREE from 'three';

import helvetiker from './fonts/helvetiker';


let courtGeometryInner = new THREE.PlaneGeometry(503, 240, 1);
let courtMaterialInner = new THREE.MeshBasicMaterial({color: 'rgb(50, 100, 50)', opacity: 0.5, transparent: true, });

let courtGeometryOuterLength = new THREE.PlaneGeometry(507, 1, 1);
let courtGeometryOuterWidth = new THREE.PlaneGeometry(1, 240, 1);
let courtMaterialOuter = new THREE.MeshBasicMaterial({color: 'rgb(50, 200, 50)', opacity: 0.4, transparent: true, });

let textMaterial = new THREE.MeshBasicMaterial({color: 'rgb(255, 255, 255)', });


class Court extends Component {
    render() {
        return (
            <Object3D>
                <Mesh
                    geometry={courtGeometryInner}
                    material={courtMaterialInner}
                    position={{x:0, y:0, z: -1}}
                />
                <Mesh
                    geometry={courtGeometryOuterLength}
                    material={courtMaterialOuter}
                    position={{x:0, y:120, z: -2}}
                />
                <Mesh
                    geometry={courtGeometryOuterLength}
                    material={courtMaterialOuter}
                    position={{x:0, y:-120, z: -2}}
                />
                <Mesh
                    geometry={courtGeometryOuterWidth}
                    material={courtMaterialOuter}
                    position={{x:0, y:0, z: -2}}
                />
                <Mesh
                    geometry={courtGeometryOuterWidth}
                    material={courtMaterialOuter}
                    position={{x:-253, y:0, z: -2}}
                />
                <Mesh
                    geometry={courtGeometryOuterWidth}
                    material={courtMaterialOuter}
                    position={{x:253, y:0, z: -2}}
                />
                <Mesh
                    geometry={new THREE.TextGeometry(
                        this.props.playerOneScore,
                        {height: 1, size: 20, font: 'helvetiker'}
                    )}
                    material={textMaterial}
                    position={{x:-40, y:80, z: 0}}
                />
                <Mesh
                    geometry={new THREE.TextGeometry(
                        this.props.playerTwoScore,
                        {height: 1, size: 20, font: 'helvetiker'}
                    )}
                    material={textMaterial}
                    position={{x:20, y:80, z: 0}}
                />
            </Object3D>
        );
    }
}

export default Court;
