import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import styled from "styled-components";
import {
  AmbientLightLeva,
  DirectionalLightLeva,
  PointLightLeva,
  RectAreaLightLeva,
  SpotLightLeva,
} from "./lights";

export function Stage({ children, ...props }) {
  return (
    <CanvasStyle shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />

      {/* <AmbientLightLeva /> */}
       <DirectionalLightLeva position={[0, 4, 3]} /> 
      {/* <PointLightLeva position={[0,1,0]}/> */}
      {/* <RectAreaLightLeva rotation={[-Math.PI*0.5,0,0]} position={[0,5,0]} />   */}
      {/* <SpotLightLeva position={[5, 6, 3]} distance={13} angle={0.3} intensity={4} penumbra={0.25} /> */}
      {children}
      <CameraControls />
      <gridHelper args={[30, 30, 30]} />
    </CanvasStyle>
  );
}

const CanvasStyle = styled(Canvas)`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  height: -webkit-fill-available;
`;
