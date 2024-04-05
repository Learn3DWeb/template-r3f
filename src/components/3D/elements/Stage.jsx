import { CameraControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import React from 'react'
import styled from 'styled-components';
import SpotLightComponent from './lights/Spot';

export function Stage({ children, ...props}) {
  return (
    <CanvasStyle shadows >
      <SpotLightComponent />
      {children}
      <CameraControls />
    </CanvasStyle>
  )
}

const CanvasStyle = styled(Canvas)`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  height: -webkit-fill-available;
`;