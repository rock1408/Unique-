import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Zap, Flame, Activity, RotateCcw, Sparkles, ChevronRight } from 'lucide-react';

interface HotspotData {
  id: 'strength' | 'cardio' | 'crossfit' | 'conditioning';
  label: string;
  subtitle: string;
  icon: React.ElementType;
  position3D: [number, number, number];
  color: string;
  focus: string;
  equipment: string;
  proTip: string;
  benefits: string[];
}

const HOTSPOTS: HotspotData[] = [
  {
    id: 'strength',
    label: 'Strength',
    subtitle: 'Olympic Iron & Progressive Overload',
    icon: Shield,
    position3D: [0, 0.4, 0],
    color: '#ccff00',
    focus: 'Hypertrophy, Multi-Joint Compound Lifts & Bone Density',
    equipment: 'Olympic calibrated barbells, bumper plates, squat racks & deadlift platforms',
    proTip: 'Focus on bracing your core and driving through the heels before increasing barbell weight.',
    benefits: ['Maximal force production', 'Postural reinforcement', 'Joint and connective tissue resilience']
  },
  {
    id: 'crossfit',
    label: 'CrossFit',
    subtitle: 'Functional High-Intensity Protocol',
    icon: Flame,
    position3D: [-2.2, 0.6, 0.4],
    color: '#f97316',
    focus: 'Olympic Cleans, Snatches, Plyometrics & WOD Conditioning',
    equipment: 'Rigs, pull-up stations, kettlebells, battle ropes & plyo boxes',
    proTip: 'Scale movements appropriately during daily WODs to preserve pristine technique under fatigue.',
    benefits: ['Explosive triple-extension power', 'Agility & coordination', 'Unmatched metabolic grit']
  },
  {
    id: 'cardio',
    label: 'Cardio',
    subtitle: 'Stamina & Aerobic Engine',
    icon: Zap,
    position3D: [2.2, 0.6, 0.4],
    color: '#38bdf8',
    focus: 'VO2 Max, Anaerobic Threshold & Cardiovascular Recovery',
    equipment: 'Commercial treadmills, assault rowers, spin bikes & HIIT tracks',
    proTip: 'Mix steady-state low heart rate sessions with high-intensity interval sprints for optimal fat burn.',
    benefits: ['Lower resting heart rate', 'Accelerated post-workout recovery', 'High daily caloric expenditure']
  },
  {
    id: 'conditioning',
    label: 'Conditioning',
    subtitle: 'Total Body Endurance & Grip',
    icon: Activity,
    position3D: [0, -0.6, 0.8],
    color: '#a855f7',
    focus: 'Core Stability, Grip Endurance & Work Capacity',
    equipment: 'Farmer carry handles, resistance bands, slam balls & landmines',
    proTip: 'Grip endurance is a direct predictor of longevity and heavy compound lift success.',
    benefits: ['Functional real-life endurance', 'Shoulder stability', 'Full kinetic chain integration']
  }
];

export const MeetWorkout3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData>(HOTSPOTS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // References to communicate with ThreeJS instance
  const rotationRef = useRef({ x: 0.15, y: -0.3 });
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let isVisible = true;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Main 3D Model Group
    const rigGroup = new THREE.Group();
    scene.add(rigGroup);

    // Materials
    const steelBarMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      metalness: 0.96,
      roughness: 0.18
    });

    const rubberBumperMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.3,
      roughness: 0.6
    });

    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      metalness: 0.8,
      roughness: 0.3
    });

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.8,
      metalness: 0.1
    });

    // 1. Olympic Barbell (7.2ft standard bar)
    const barbell = new THREE.Group();
    
    // Central bar shaft
    const barGeo = new THREE.CylinderGeometry(0.065, 0.065, 5.2, 32);
    const bar = new THREE.Mesh(barGeo, steelBarMat);
    bar.rotation.z = Math.PI / 2;
    barbell.add(bar);

    // Olympic Sleeves & Plate stacks
    const createSleeveStack = (direction: number) => {
      const sleeveGroup = new THREE.Group();
      sleeveGroup.position.x = direction * 2.6;

      // Sleeve cylinder
      const sleeveGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 32);
      const sleeve = new THREE.Mesh(sleeveGeo, steelBarMat);
      sleeve.rotation.z = Math.PI / 2;
      sleeveGroup.add(sleeve);

      // Lock Collar
      const lockGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.14, 32);
      const lock = new THREE.Mesh(lockGeo, collarMat);
      lock.position.x = direction * 0.15;
      lock.rotation.z = Math.PI / 2;
      sleeveGroup.add(lock);

      // Plate 1 - 20KG Bumper (Large)
      const plate1Geo = new THREE.CylinderGeometry(0.95, 0.95, 0.22, 48);
      const plate1 = new THREE.Mesh(plate1Geo, rubberBumperMat);
      plate1.position.x = direction * 0.35;
      plate1.rotation.z = Math.PI / 2;
      sleeveGroup.add(plate1);

      // Plate 2 - 15KG Bumper (Medium)
      const plate2Geo = new THREE.CylinderGeometry(0.85, 0.85, 0.18, 48);
      const plate2 = new THREE.Mesh(plate2Geo, rubberBumperMat);
      plate2.position.x = direction * 0.58;
      plate2.rotation.z = Math.PI / 2;
      sleeveGroup.add(plate2);

      // Plate 3 - 10KG Bumper
      const plate3Geo = new THREE.CylinderGeometry(0.72, 0.72, 0.15, 48);
      const plate3 = new THREE.Mesh(plate3Geo, rubberBumperMat);
      plate3.position.x = direction * 0.76;
      plate3.rotation.z = Math.PI / 2;
      sleeveGroup.add(plate3);

      barbell.add(sleeveGroup);
    };

    createSleeveStack(1);
    createSleeveStack(-1);

    barbell.position.y = 0.2;
    rigGroup.add(barbell);

    // 2. Heavy-duty Kettlebells flanking the barbell
    const createKettlebell = (posX: number, posZ: number, colorHex: number) => {
      const kbGroup = new THREE.Group();
      kbGroup.position.set(posX, -0.65, posZ);

      // Body ball
      const ballGeo = new THREE.SphereGeometry(0.42, 32, 32);
      const ballMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.45,
        metalness: 0.6
      });
      const ball = new THREE.Mesh(ballGeo, ballMat);
      kbGroup.add(ball);

      // Handle
      const handleGeo = new THREE.TorusGeometry(0.24, 0.05, 16, 32, Math.PI);
      const handle = new THREE.Mesh(handleGeo, steelBarMat);
      handle.position.y = 0.42;
      kbGroup.add(handle);

      rigGroup.add(kbGroup);
    };

    createKettlebell(-1.8, 0.8, 0x27272a);
    createKettlebell(1.8, 0.8, 0x1f2937);

    // 3. Circular workout platform ring
    const platformGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.12, 48);
    const platform = new THREE.Mesh(platformGeo, floorMat);
    platform.position.y = -1.1;
    rigGroup.add(platform);

    const platformRingGeo = new THREE.TorusGeometry(3.62, 0.03, 16, 64);
    const platformRing = new THREE.Mesh(platformRingGeo, collarMat);
    platformRing.position.y = -1.04;
    platformRing.rotation.x = Math.PI / 2;
    rigGroup.add(platformRing);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(4, 5, 5);
    scene.add(mainLight);

    const accentLimeLight = new THREE.PointLight(0xccff00, 4.5, 12);
    accentLimeLight.position.set(0, 2.5, 2);
    scene.add(accentLimeLight);

    const backRimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    backRimLight.position.set(-4, 3, -4);
    scene.add(backRimLight);

    // Mouse drag interaction
    let startX = 0;
    let startY = 0;
    let isPointerDown = false;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      startX = e.clientX;
      startY = e.clientY;
      setIsDragging(true);
      setIsAutoRotate(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      startX = e.clientX;
      startY = e.clientY;

      rotationRef.current.y += deltaX * 0.008;
      rotationRef.current.x = Math.max(-0.4, Math.min(0.6, rotationRef.current.x + deltaY * 0.006));
    };

    const onPointerUp = () => {
      isPointerDown = false;
      setIsDragging(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Viewport observer
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();

      if (isAutoRotate && !isPointerDown) {
        rotationRef.current.y += 0.4 * delta;
      }

      rigGroup.rotation.y = rotationRef.current.y;
      rigGroup.rotation.x = rotationRef.current.x;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      renderer.dispose();
      barGeo.dispose();
      steelBarMat.dispose();
      rubberBumperMat.dispose();
      collarMat.dispose();
      floorMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isAutoRotate]);

  const resetCamera = () => {
    rotationRef.current = { x: 0.15, y: -0.3 };
    setIsAutoRotate(true);
  };

  const handleEnquireScroll = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="experience" className="relative py-24 bg-[#070709] border-y border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Equipment Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
            MEET YOUR <span className="text-[#ccff00]">WORKOUT.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Rotate the 3D Olympic training rig in real-time. Explore the core pillars engineered for your peak transformation at Unique Fitness.
          </p>

          {/* Hotspot Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {HOTSPOTS.map(spot => {
              const Icon = spot.icon;
              const isActive = activeHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  id={`btn-hotspot-${spot.id}`}
                  onClick={() => setActiveHotspot(spot)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20 scale-105 font-bold'
                      : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{spot.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive 3D Canvas & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Viewport */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-zinc-900/60 to-black/80 border border-white/10 p-2 overflow-hidden shadow-2xl">
            <div 
              ref={containerRef} 
              className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} touch-none`}
            />

            {/* Interaction Badges & Controls Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span>Drag to Rotate 360°</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                id="btn-toggle-autorotate"
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className="px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-xs text-zinc-300 border border-white/10 transition-colors cursor-pointer"
              >
                {isAutoRotate ? 'Pause Rotation' : 'Auto Rotate'}
              </button>
              <button
                id="btn-reset-3d-view"
                onClick={resetCamera}
                title="Reset View"
                aria-label="Reset View"
                className="p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between items-center text-[11px] text-zinc-500 font-mono">
              <span>UNIQUE FITNESS • OLYMPIC GRADE SETUP</span>
              <span className="hidden sm:inline">KENGERI, BENGALURU</span>
            </div>
          </div>

          {/* Dynamic Hotspot Information Panel */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden transition-all duration-300">
              {/* Colored accent line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-colors duration-300"
                style={{ backgroundColor: activeHotspot.color }}
              />

              <div className="flex items-center gap-3.5 mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${activeHotspot.color}18`, border: `1px solid ${activeHotspot.color}40` }}
                >
                  <activeHotspot.icon className="w-6 h-6" style={{ color: activeHotspot.color }} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Selected Focus</span>
                  <h3 className="text-2xl font-black text-white">{activeHotspot.label}</h3>
                </div>
              </div>

              <p className="text-sm text-zinc-300 font-medium mb-6">
                {activeHotspot.subtitle}
              </p>

              <div className="space-y-4 text-sm">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-[#ccff00] font-bold block mb-1">Target Development</span>
                  <p className="text-zinc-300">{activeHotspot.focus}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-1">Gym Floor Gear</span>
                  <p className="text-zinc-300">{activeHotspot.equipment}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#ccff00]/5 border border-[#ccff00]/20">
                  <span className="text-xs uppercase tracking-wider text-[#ccff00] font-bold block mb-1">Coach's Pro Tip</span>
                  <p className="text-zinc-300 text-xs italic leading-relaxed">"{activeHotspot.proTip}"</p>
                </div>

                {/* Key Benefits */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-2">Program Highlights</span>
                  <ul className="space-y-1.5">
                    {activeHotspot.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  id="btn-enquire-active-focus"
                  onClick={handleEnquireScroll}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                >
                  <span>Enquire for {activeHotspot.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
