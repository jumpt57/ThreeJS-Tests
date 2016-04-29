var Plane = function(){
    this.geometry = new THREE.PlaneBufferGeometry( 200, 200 );
    this.geometry.rotateX( - Math.PI / 2 );

    this.material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

    this.model = new THREE.Mesh(this.geometry, this.material);
}
