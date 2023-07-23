"use client";
import { Navigation } from "../components/nav";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { initialTabs as projects } from "./projectList";
import { AnimatePresence, motion } from "framer-motion";

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
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="window">
          <nav className="project-nav">
            <ul>
              {projects.map((item) => (
                <li
                  key={item.label}
                  className={item === selectedProject ? "selected" : ""}
                  onClick={() => setSelectedProject(item)}
                >
                  {`${item.icon} ${item.label}`}
                  {item === selectedProject ? (
                    <motion.div className="underline" layoutId="underline" />
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject ? selectedProject.label : "empty"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mt-5 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {selectedProject ? selectedProject.icon : "😋"} */}
              </motion.div>
            </AnimatePresence>
          </main>
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
