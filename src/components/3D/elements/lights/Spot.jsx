import { useControls } from "leva";
import { SpotLightHelper } from "three";
import { Sphere, useHelper } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function SpotLightComponent({
  color = 0xffffff, // Default color is white
  intensity = 1, // Default intensity is 1
  distance = 0, // Default distance is 0 (no limit)
  angle = 0.75, // Default angle is Math.PI/2
  penumbra = 0, // Default penumbra is 0
  decay = 1, // Default decay is 1
  helperColor = "cyan", // Default helper color is cyan
  position = [0, 1, 1], // Default position is (0, 1, 0)
  targetPosition = [0, 0, 0], // Default target position is (0, 0, 0)
  castShadow = true, // Default is not to cast shadows
  ...props
}) {
  // Create Leva controls for adjusting spot light parameters
  const { showTarget, showHelper, ...spotLightVars } = useControls(
    "Spot Light",
    {
      // Toggle for helper visibility
      showHelper: { value: true },
      // Hexadecimal color of the light
      color: { value: color },
      // Numeric value of the light's strength/intensity
      intensity: { value: intensity, min: 0, step: 0.1 },
      // Maximum range of the light
      distance: { value: distance, min: 0, step: 1 },
      // Maximum angle of light dispersion from its direction
      angle: { value: angle, min: 0, max: Math.PI / 2, step: Math.PI / 180 },
      // Percent of the spotlight cone that is attenuated due to penumbra
      penumbra: { value: penumbra, min: 0, max: 1, step: 0.01 },
      // The amount the light dims along the distance of the light
      decay: { value: decay, min: 0, step: 0.1 },
      // Position of the light
      position: { value: position },
      // Toggle for target visibility
      showTarget: { value: true },
      // Position of the target for the light to point towards
      targetPosition: { value: targetPosition },
      // Toggle to cast shadows
      castShadow: { value: castShadow }
    },
    { collapsed: true }
  );

  // Create refs for spot light and shadow camera
  const spotLightRef = useRef();

  // Attach SpotLightHelper to spot light ref if showHelper is true
  useHelper(showHelper ? spotLightRef: { current: null }, SpotLightHelper, {
    visible: spotLightVars.showHelper,
  });

  // Create a target object for the spotlight to point towards
  const targetObject = useRef();

  // Update the target object's position when the targetPosition changes
  useEffect(() => {
    targetObject.current.position.set(...spotLightVars.targetPosition);
  }, [spotLightVars.targetPosition]);

  return (
    <>
      <spotLight {...{ ...spotLightVars, ...props }} ref={spotLightRef} target={targetObject.current} castShadow={spotLightVars.castShadow}/>
      {/* Render the target object only if showTarget is true */}
      <Sphere
        args={[0.05, 5, 5]}
        ref={targetObject}
        material-opacity={showTarget ? 0.75 : 0}
        material-transparent={true}
      />
    </>
  );
}
