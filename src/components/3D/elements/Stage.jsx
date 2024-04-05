import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import styled from "styled-components";
import SpotLightLeva from "./lights/Spot";

export function Stage({ children, ...props }) {
  return (
    <CanvasStyle shadows>
      <SpotLightLeva position={[-2, 1, 1]} color={"red"} />
      <SpotLightLeva position={[2, 1, 1]} color={"blue"} />
      {children}
      <CameraControls />
    </CanvasStyle>
  );
}

const CanvasStyle = styled(Canvas)`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  height: -webkit-fill-available;
`;
