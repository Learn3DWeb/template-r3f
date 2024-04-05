import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import styled from "styled-components";
import { AmbientLightLeva, DirectionalLightLeva, PointLightLeva, RectAreaLightLeva, SpotLightLeva } from "./lights";

export function Stage({ children, ...props }) {
  return (
    <CanvasStyle shadows>
      <AmbientLightLeva />
      <DirectionalLightLeva />
      <PointLightLeva />
      <RectAreaLightLeva />
      <SpotLightLeva />
 
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
