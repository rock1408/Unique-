import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let animationFrameId: number;
    let isVisible = true;

    // Dimensions
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group for the Dumbbell & Particles
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Materials - Dark luxury aesthetic with metallic sheen & electric lime accents
    const metallicShaftMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.22
    });

    const rubberPlateMat = new THREE.MeshStandardMaterial({
      color: 0x141419,
      metalness: 0.25,
      roughness: 0.55
    });

    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.85,
      roughness: 0.25
    });

    const neonLimeMat = new THREE.MeshBasicMaterial({
      color: 0xccff00
    });

    // Dumbbell Object Construction
    const dumbbellGroup = new THREE.Group();

    // 1. Center knurled handle
    const handleGeo = new THREE.CylinderGeometry(0.19, 0.19, 3.4, 32);
    const handle = new THREE.Mesh(handleGeo, metallicShaftMat);
    handle.rotation.z = Math.PI / 2;
    dumbbellGroup.add(handle);

    // Handle grip rings (textured look)
    for (let i = -1.1; i <= 1.1; i += 0.35) {
      const ringGeo = new THREE.TorusGeometry(0.20, 0.015, 12, 28);
      const ring = new THREE.Mesh(ringGeo, innerRingMat);
      ring.position.x = i;
      ring.rotation.y = Math.PI / 2;
      dumbbellGroup.add(ring);
    }

    // Function to add a plate stack on either side
    const createPlateSide = (direction: number) => {
      const sideGroup = new THREE.Group();
      sideGroup.position.x = direction * 1.95;

      // Inner stop collar
      const collarGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.24, 32);
      const collar = new THREE.Mesh(collarGeo, metallicShaftMat);
      collar.rotation.z = Math.PI / 2;
      sideGroup.add(collar);

      // Neon accent ring on collar
      const neonRingGeo = new THREE.TorusGeometry(0.37, 0.02, 16, 32);
      const neonRing = new THREE.Mesh(neonRingGeo, neonLimeMat);
      neonRing.rotation.y = Math.PI / 2;
      sideGroup.add(neonRing);

      // Plate 1: Large Olympic plate
      const plate1Geo = new THREE.CylinderGeometry(1.65, 1.65, 0.38, 48);
      const plate1 = new THREE.Mesh(plate1Geo, rubberPlateMat);
      plate1.position.x = direction * 0.35;
      plate1.rotation.z = Math.PI / 2;
      sideGroup.add(plate1);

      // Plate 1 rim glow
      const rim1Geo = new THREE.TorusGeometry(1.66, 0.025, 16, 48);
      const rim1 = new THREE.Mesh(rim1Geo, neonLimeMat);
      rim1.position.x = direction * 0.35;
      rim1.rotation.y = Math.PI / 2;
      sideGroup.add(rim1);

      // Plate 2: Medium Olympic plate
      const plate2Geo = new THREE.CylinderGeometry(1.42, 1.42, 0.34, 48);
      const plate2 = new THREE.Mesh(plate2Geo, rubberPlateMat);
      plate2.position.x = direction * 0.74;
      plate2.rotation.z = Math.PI / 2;
      sideGroup.add(plate2);

      // Plate 3: Small Olympic plate
      const plate3Geo = new THREE.CylinderGeometry(1.15, 1.15, 0.28, 48);
      const plate3 = new THREE.Mesh(plate3Geo, rubberPlateMat);
      plate3.position.x = direction * 1.08;
      plate3.rotation.z = Math.PI / 2;
      sideGroup.add(plate3);

      // Outer cap/nut
      const outerNutGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.2, 32);
      const outerNut = new THREE.Mesh(outerNutGeo, metallicShaftMat);
      outerNut.position.x = direction * 1.34;
      outerNut.rotation.z = Math.PI / 2;
      sideGroup.add(outerNut);

      dumbbellGroup.add(sideGroup);
    };

    createPlateSide(1);
    createPlateSide(-1);

    // Initial orientation: dramatic tilt
    dumbbellGroup.rotation.set(0.35, -0.4, 0.25);
    mainGroup.add(dumbbellGroup);

    // Floating energetic ambient particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xccff00,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lighting: Studio high-contrast setup with electric lime rim light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLightLime = new THREE.DirectionalLight(0xccff00, 3.5);
    rimLightLime.position.set(-6, -4, -2);
    scene.add(rimLightLime);

    const blueFillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    blueFillLight.position.set(-4, 4, 3);
    scene.add(blueFillLight);

    // Interaction tracking (mouse & touch)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.35;
    let targetRotationY = -0.4;
    let scrollYOffset = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = -0.4 + mouseX * 0.75;
      targetRotationX = 0.35 - mouseY * 0.6;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = -0.4 + x * 0.8;
        targetRotationX = 0.35 - y * 0.6;
      }
    };

    const handleScroll = () => {
      scrollYOffset = window.scrollY * 0.0012;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimization: Pause rendering when out of viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // Render loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle idle float + reaction to mouse & scroll
      dumbbellGroup.rotation.y += (targetRotationY + scrollYOffset - dumbbellGroup.rotation.y) * 0.045;
      dumbbellGroup.rotation.x += (targetRotationX - dumbbellGroup.rotation.x) * 0.045;
      dumbbellGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      dumbbellGroup.rotation.z = 0.25 + Math.cos(elapsedTime * 0.9) * 0.08;

      // Slow particle drift
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Dispose resources
      renderer.dispose();
      handleGeo.dispose();
      metallicShaftMat.dispose();
      rubberPlateMat.dispose();
      innerRingMat.dispose();
      neonLimeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full min-h-[380px] lg:min-h-[520px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      {/* 3D Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* WebGL Fallback */}
      {!hasWebGL && (
        <div className="flex flex-col items-center justify-center text-center p-6 border border-zinc-800 rounded-2xl bg-zinc-950/80">
          <div className="w-24 h-24 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center mb-4">
            <span className="text-4xl text-[#ccff00]">⚡</span>
          </div>
          <p className="text-lg font-bold text-white tracking-wide">3D ACCELERATED GYM</p>
          <p className="text-sm text-zinc-400 mt-1">Unique Fitness Olympic Rig & Iron</p>
        </div>
      )}

      {/* Subtle Hint Badge */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-zinc-400 font-medium transition-opacity duration-300">
        <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
        <span>3D Interactive • Move Cursor to Tilt</span>
      </div>
    </div>
  );
};
