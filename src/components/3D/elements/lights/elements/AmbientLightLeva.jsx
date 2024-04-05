import { folder, useControls } from "leva";
import { useMemo, memo } from "react";

// Function to generate a random 2-digit hexadecimal string
function generateID(length = 3) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

// Memoized AmbientLightLeva component
export const AmbientLightLeva = memo(
  ({
    name,
    color = "#ffffff",
    intensity = 1,
    ...props
  }) => {
    // Generate a unique ID for each AmbientLight or use provided name
    let ID = name || useMemo(() => generateID(), []);

    // Create Leva controls for adjusting AmbientLight parameters
    const ambientLightVars = useControls(
      // Group AmbientLight controls under a folder with a unique name
      `🕯 ambientlight`,
      {
        // Create a folder for AmbientLight parameters
        [`ambient:${ID}`]: folder(
          {
            // Numeric value of the light's intensity
            intensity: { value: intensity, min: 0, step: 0.1 },
            // Hexadecimal color of the light
            color: { value: color },
          },
          { collapsed: true }
        ), // Collapse the folder by default
      },
      { collapsed: true } // Collapse the AmbientLight group by default
    );

    return (
      <>
        {/* Render the AmbientLight with Leva-controlled parameters */}
        <ambientLight
          {...{ ...ambientLightVars, ...props }}
        />
      </>
    );
  }
);

