"use client";
import { Navigation } from "../components/nav";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";

export default function ProjectsPage() {
  const Model = () => {
    // location of the 3D model
    const gltf = useLoader(GLTFLoader, "/dog.glb");
    return (
      <>
        {/* Use scale to control the size of the 3D model */}
        <primitive object={gltf.scene} scale={0.5} />
      </>
    );
  };

  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div style={{ zIndex: 10 }}>
          <h1>Projects</h1>
        </div>
        <div className="globe">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{
              position: [0, 2, 4],
            }}
          >
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              angle={0.1}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
