var Cube = function(){

    this.geometry = new THREE.BoxGeometry(200, 200, 200);

    for ( var i = 0; i < this.geometry.faces.length; i += 2 ) {
        var hex = Math.random() * 0xffffff;
        this.geometry.faces[ i ].color.setHex( hex );
        this.geometry.faces[ i + 1 ].color.setHex( hex );
    }

    this.material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});

    this.model = new THREE.Mesh(this.geometry, this.material);
    this.model.position.y = 150;

}
