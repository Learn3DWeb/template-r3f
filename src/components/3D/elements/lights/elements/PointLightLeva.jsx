import { folder, useControls } from "leva";
import { PointLightHelper } from "three";
import { Sphere, useHelper } from "@react-three/drei";
import { useRef, useEffect, useMemo, memo } from "react";

// Function to generate a random 2-digit hexadecimal string
function generateID(length = 3) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

export const PointLightLeva = memo(
  ({
    name, // Unique label name for Leva display. Default name is a random 2-digit hexadecimal string
    color = "#ffffff", // Default color is white
    position = [0, 0, 0], // Default position is (0, 1, 1)
    intensity = 1, // Default intensity is 1
    distance = 0, // Default distance is 0 (no limit)
    decay = 2, // Default decay is 2
    castShadow = true, // Default is not to cast shadows
    showHelper = false, // Default is not to show the helper
    ...props
  }) => {
    // Generate a unique ID for each point light or use provided name
    let ID = name || useMemo(() => generateID(), []);

    // Create Leva controls for adjusting point light parameters
    const pointLightVars = useControls(
      // Group point light controls under a folder with a unique name
      `💡 pointlight`,
      {
        // Create a folder for point light parameters
        [`point:${ID}`]: folder(
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
            // The amount the light dims along the distance of the light
            decay: { value: decay, min: 0, step: 0.1 },
            // Toggle to cast shadows
            castShadow: { value: castShadow },
          },
          { collapsed: true }
        ), // Collapse the folder by default
      },
      { collapsed: true } // Collapse the point light group by default
    );

    // Create ref for point light
    const pointLightRef = useRef();

    // Attach PointLightHelper to point light ref if showHelper is true
    useHelper(
      pointLightVars.showHelper ? pointLightRef : { current: null },
      PointLightHelper,
      0.5,
      pointLightVars.color
    );

    return (
      <>
        {/* Render the point light with Leva-controlled parameters */}
        <pointLight
          {...{ ...pointLightVars, ...props }}
          ref={pointLightRef}
          castShadow={pointLightVars.castShadow}
        />
      </>
    );
  }
);
