import { CameraControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import React from 'react'
import styled from 'styled-components';

export function Stage({ children, ...props}) {
  return (
    <CanvasStyle>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
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