import { folder, useControls } from "leva";
import { SpotLightHelper } from "three";
import { Sphere, useHelper } from "@react-three/drei";
import { useRef, useEffect, useMemo, memo } from "react";

// Function to generate a random 2-digit hexadecimal string
function generateID(length = 3) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

export const SpotLightLeva = memo(
  ({
    name, // Unique label name for Leva display. Default name is a random 2-digit hexadecimal string
    color = "#ffffff", // Default color is white
    intensity = 1, // Default intensity is 1
    distance = 0, // Default distance is 0 (no limit)
    angle = 0.75, // Default angle is Math.PI/2
    penumbra = 0, // Default penumbra is 0
    decay = 1, // Default decay is 1
    helperColor = "cyan", // Default helper color is cyan
    position = [0, 0, 0], // Default position is (0, 1, 1)
    targetPosition = [0, 0, 0], // Default target position is (0, 0, 0)
    castShadow = false, // Default is not to cast shadows
    showTarget = false, // Default is not to show the target
    showHelper = false, // Default is not to show the helper
    ...props
  }) => {
    // Generate a unique ID for each spotlight or use provided name
    let ID = name || useMemo(() => generateID(), []);

    // Create Leva controls for adjusting spot light parameters
    const spotLightVars = useControls(
      // Group spotlight controls under a folder with a unique name
      `🔦 spotlight`,
      {
        // Create a folder for spotlight parameters
        [`light:${ID}`]: folder(
          {
            // Toggle for helper visibility
            showHelper: { value: showHelper },
            // Hexadecimal color of the light
            color: { value: color },
            // Position of the light
            position: { value: position },
            // Numeric value of the light's strength/intensity
            intensity: { value: intensity, min: 0, step: 0.1 },
            // Maximum range of the light
            distance: { value: distance, min: 0, step: 1 },
            // Maximum angle of light dispersion from its direction
            angle: {
              value: angle,
              min: 0,
              max: Math.PI / 2,
              step: Math.PI / 180,
            },
            // Percent of the spotlight cone that is attenuated due to penumbra
            penumbra: { value: penumbra, min: 0, max: 1, step: 0.01 },
            // The amount the light dims along the distance of the light
            decay: { value: decay, min: 0, step: 0.1 },
            // Toggle for target visibility
            showTarget: { value: showTarget },
            // Position of the target for the light to point towards
            targetPosition: { value: targetPosition },
            // Toggle to cast shadows
            castShadow: { value: castShadow },
          },
          { collapsed: true }
        ), // Collapse the folder by default
      },
      { collapsed: true } // Collapse the spotlight group by default
    );

    // Create refs for spot light and shadow camera
    const spotLightRef = useRef();

    // Attach SpotLightHelper to spot light ref if showHelper is true
    useHelper(
      spotLightVars.showHelper ? spotLightRef : { current: null },
      SpotLightHelper,
      spotLightVars.color
    );

    // Create a target object for the spotlight to point towards
    const targetObject = useRef();

    // Update the target object's position when the targetPosition changes
    useEffect(() => {
      targetObject.current.position.set(...spotLightVars.targetPosition);
    }, [spotLightVars.targetPosition]);

    return (
      <>
        {/* Render the spotlight with Leva-controlled parameters */}
        <spotLight
          {...{ ...spotLightVars, ...props }}
          ref={spotLightRef}
          target={targetObject.current}
          castShadow={spotLightVars.castShadow}
        />
        {/* Render the target object only if showTarget is true */}
        <Sphere
          args={[0.05, 5, 5]}
          ref={targetObject}
          material-opacity={spotLightVars.showTarget ? 0.75 : 0}
          material-transparent={true}
        />
      </>
    );
  }
);
