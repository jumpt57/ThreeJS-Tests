angular.module('App').directive('ngCanvas', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        controller : function($scope, $element, $rootScope){

            var camera, scene, renderer;

            var cube, plane;

            var targetRotation = 0;
            var targetRotationOnMouseDown = 0;

            var mouseX = 0;
            var mouseXOnMouseDown = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            init();
            animate();

            function init(){
                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
                camera.position.y = 150;
                camera.position.z = 500;

                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
                renderer.setClearColor(0xf0f0f0);

                document.body.appendChild(renderer.domElement);

                cube = new Cube();
                plane = new Plane();

                scene.add(plane.model);
                scene.add(cube.model);

                document.addEventListener('mousedown', onDocumentMouseDown, false);
                document.addEventListener('touchstart', onDocumentTouchStart, false);
                document.addEventListener('touchmove', onDocumentTouchMove, false);

                window.addEventListener( 'resize', onWindowResize, false );
            }

            function onWindowResize() {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            function onDocumentMouseDown( event ) {
                event.preventDefault();
                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );
                document.addEventListener( 'mouseout', onDocumentMouseOut, false );
                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;
            }
            function onDocumentMouseMove( event ) {
                mouseX = event.clientX - windowHalfX;
                targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
            }
            function onDocumentMouseUp( event ) {
                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
            }
            function onDocumentMouseOut( event ) {
                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
            }
            function onDocumentTouchStart( event ) {
                if ( event.touches.length === 1 ) {
                    event.preventDefault();
                    mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotationOnMouseDown = targetRotation;
                }
            }
            function onDocumentTouchMove( event ) {
                if ( event.touches.length === 1 ) {
                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
                }
            }

            function animate() {
                requestAnimationFrame(animate);
                render();
            }

            function render() {
                plane.model.rotation.y = cube.model.rotation.y += ( targetRotation - cube.model.rotation.y ) * 0.05;
                renderer.render(scene, camera);
            }
        },
        link: function(scope, element, attrs) {

        }
    };
}]);