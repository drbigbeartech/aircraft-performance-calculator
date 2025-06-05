import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDShockWave = ({ mach, angle }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mach || !angle) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.5, 400);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.ConeGeometry(1, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cone = new THREE.Mesh(geometry, material);
    scene.add(cone);

    // Adjust cone based on Mach and angle
    cone.rotation.z = angle * Math.PI / 180;
    cone.scale.set(1, mach, 1);

    camera.position.z = 5;
    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [mach, angle]);

  return <div ref={mountRef} className="mt-4" />;
};

export { ThreeDShockWave };