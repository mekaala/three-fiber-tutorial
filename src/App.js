import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

const Cube = ({position, size, color}) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2.0
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
    console.log(state.clock.elapsedTime);
  })

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const Sphere = ({position, size, color}) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2 
    ref.current.rotation.y += delta * speed
  })
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size}/>
      <meshStandardMaterial color={isHovered ? "red" : "lightblue"} wireframe/>
    </mesh>
  )
}
const Torus = ({position, size, color}) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const TorusKnot = ({position, size, color}) => {
  const ref = useRef();

  // useFrame((state, delta) => {
  //   ref.current.rotation.x += delta
  //   ref.current.rotation.y += delta * 2.0
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
  // })
  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size}/>
      <MeshWobbleMaterial color={color} factor={5} speed={2}/>
    </mesh>
  )
}

const Scene = () => {
  const directionalLightRef = useRef()

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");
  return (
    <>
      <ambientLight intensity={0.1}/>
      <directionalLight position={[0, 0, 2]} intensity={0.5} ref={directionalLightRef}/>
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]}/>
        <Cube position={[-1, 0, 0]} color={"red"} size={[1, 1, 1]}/>
        <Cube position={[-1, 2, 0]} color={"yellow"} size={[1, 1, 1]}/>
        <Cube position={[1, 2, 0]} color={"blue"} size={[1, 1, 1]}/>
      </group> */}
      {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"red"} />
      <Sphere position={[0, 0, 0]} args={[1, 30, 30]} color={"red"}/>
      <Torus position={[2, 0, 0]} size={[0.5, 0.1, 30, 30]} color={"blue"} /> */}
      <TorusKnot position={[0, 0, 0]} size={[1, 0.1, 1000, 50]} color={"yellow"} />
      <OrbitControls enableZoom={false}  />
    </>
  )
}
 
const App = () => {
  return (
    <div className="App">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}

export default App