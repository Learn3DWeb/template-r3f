import React from "react";
import { Box, Stage } from "../";
import { Plane } from "@react-three/drei";

export function Scene3D() {
  return (
    <Stage>
      <Box position={[-1.2, 1, 0]} castShadow receiveShadow />
      <Box position={[1.2, 1, 0]} castShadow receiveShadow />
      <Plane position={[0, 0.05, 0]} args={[10, 10]} rotation={[-Math.PI / 2,0,0]} receiveShadow castShadow >
        <meshStandardMaterial />
      </Plane>
    </Stage>
  );
}
