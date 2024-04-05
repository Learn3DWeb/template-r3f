import { folder, useControls } from "leva";
import { useMemo, memo } from "react";
import { Plane } from "@react-three/drei";

// Function to generate a random 2-digit hexadecimal string
function generateID(length = 3) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

// Memoized RectAreaLightLeva component
export const RectAreaLightLeva = memo(
  ({
    name,
    color = "#ffffff",
    position = [0, 0, 0], // Default position is (0, 0, 0)
    rotation = [0, 0, 0], // Default rotation is (0, 0, 0)
    intensity = 1,
    width = 10,
    height = 10,
    showHelper = false,
    ...props
  }) => {
    // Generate a unique ID for each RectAreaLight or use provided name
    let ID = name || useMemo(() => generateID(), []);

    // Create Leva controls for adjusting RectAreaLight parameters
    const rectAreaLightVars = useControls(
      // Group RectAreaLight controls under a folder with a unique name
      `⬜ rectarealight`,
      {
        // Create a folder for RectAreaLight parameters
        [`rectarea:${ID}`]: folder(
          {
            // Toggle for helper visibility
            showHelper: { value: showHelper },
            // Hexadecimal color of the light
            color: { value: color },
            // Numeric value of the light's intensity
            intensity: { value: intensity, min: 0, step: 0.1 },
            // Width of the light
            width: { value: width, min: 0, step: 0.1 },
            // Height of the light
            height: { value: height, min: 0, step: 0.1 },
            // Position of the light
            position: { value: position },
            // Rotation of the light
            rotation: { value: rotation },
          },
          { collapsed: true }
        ), // Collapse the folder by default
      },
      { collapsed: true } // Collapse the RectAreaLight group by default
    );

    return (
      <>
        {/* Render the RectAreaLight with Leva-controlled parameters */}
        <rectAreaLight {...{ ...rectAreaLightVars, ...props }} />
        {/* Render the helper if showHelper is true */}
        {rectAreaLightVars.showHelper && (
          <Plane
            args={[rectAreaLightVars.width, rectAreaLightVars.height]}
            position={rectAreaLightVars.position}
            rotation={rectAreaLightVars.ro}
            material-color={rectAreaLightVars.color}
            material-wireframe={true}
          />
        )}
      </>
    );
  }
);

