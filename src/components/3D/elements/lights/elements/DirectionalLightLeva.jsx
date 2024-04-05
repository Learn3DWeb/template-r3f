import { folder, useControls } from "leva";
import { useRef, useMemo, memo } from "react";

// Function to generate a random 2-digit hexadecimal string
function generateID(length = 3) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

// Memoized DirectionalLightLeva component
export const DirectionalLightLeva = memo(
  ({
    name,
    color = "#ffffff",
    intensity = 1,
    castShadow = false,
    ...props
  }) => {
    // Generate a unique ID for each DirectionalLight or use provided name
    let ID = name || useMemo(() => generateID(), []);

    // Create Leva controls for adjusting DirectionalLight parameters
    const directionalLightVars = useControls(
      // Group DirectionalLight controls under a folder with a unique name
      `🌕 directionallight`,
      {
        // Create a folder for DirectionalLight parameters
        [`directional:${ID}`]: folder(
          {
            // Hexadecimal color of the light
            color: { value: color },
            // Numeric value of the light's intensity
            intensity: { value: intensity, min: 0, step: 0.1 },
            // Toggle to cast shadows
            castShadow: { value: castShadow },
          },
          { collapsed: true }
        ), // Collapse the folder by default
      },
      { collapsed: true } // Collapse the DirectionalLight group by default
    );

    // Create ref for DirectionalLight
    const directionalLightRef = useRef();

    return (
      <>
        {/* Render the DirectionalLight with Leva-controlled parameters */}
        <directionalLight
          {...{ ...directionalLightVars, ...props }}
          ref={directionalLightRef}
        />
      </>
    );
  }
);
