import React from 'react'
import { Box, Stage } from '../'

export function Scene3D() {
  return (
    <Stage>
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Stage>
  )
}
