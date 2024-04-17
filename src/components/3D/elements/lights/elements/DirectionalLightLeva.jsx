import { memo, useMemo, useRef, useEffect } from "react";
import { useControls, folder } from "leva";
import { DirectionalLightHelper, CameraHelper } from "three";
import { useHelper } from "@react-three/drei";

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
    shadowBias = -0.005,
    shadowRadius = 1,
    shadowFar = 9,
    cameraSize = 3,
    castShadow = true,
    showHelper = false,
    position = [0, 1, 1], // Default position is (0, 1, 1)
    ...props
  }) => {
    // Generate a unique ID for each DirectionalLight or use provided name
    let ID = name || useMemo(() => generateID(), []);

    // Create Leva controls for adjusting DirectionalLight parameters
    const {
      shadowFar:SFar,
      cameraSize:CSize,
      shadowBias:SBias,
      shadowRadius:SRadius,
      ...directionalLightVars
    } = useControls(
      // Group DirectionalLight controls under a folder with a unique name
      `🌕 directionallight`,
      {
        // Create a folder for DirectionalLight parameters
        [`directional:${ID}`]: folder(
          {
            // Toggle for helper visibility
            showHelper: { value: showHelper },
            // Hexadecimal color of the light
            color: { value: color },
            // Numeric value of the light's intensity
            intensity: { value: intensity, min: 0, step: 0.1 },
            // Toggle to cast shadows
            castShadow: { value: castShadow },
            // Position of the light
            position: { value: position },
            // Additional shadow variables
            shadowBias: { value: shadowBias, label: "Bias" },
            shadowRadius: { value: shadowRadius, label: "Radius" },
            shadowFar: { value: shadowFar, label: "Far" },
            cameraSize: { value: cameraSize, label: "Size" },
          },
          { collapsed: true }
        ), // Collapse the folder by default
      },
      { collapsed: true } // Collapse the DirectionalLight group by default
    );

    // Create ref for DirectionalLight
    // const directionalLightRef = useRef();
    // const dCameraRef = useRef();

    //useHelper(directionalLightVars.showHelper && dCameraRef, CameraHelper, 1, "hotpink");
    // Create ref for point light
    const directionalLightRef = useRef();
    const dCamera = useRef();

    useEffect(() => {
      dCamera.current = directionalLightRef.current
        ? directionalLightRef.current.shadow.camera
        : null;
    }, [directionalLightRef]);

    useHelper(
      directionalLightVars.showHelper ? dCamera : { current: null },
      CameraHelper
    );

    return (
      <>
        {/* Render the DirectionalLight with Leva-controlled parameters */}
        <directionalLight
          {...{ ...directionalLightVars, ...props }}
          ref={directionalLightRef}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-camera-far={SFar}
          shadow-camera-left={CSize * -1}
          shadow-camera-right={CSize}
          shadow-camera-top={CSize}
          shadow-camera-bottom={CSize * -1}
          shadow-bias={SBias}
          shadow-radius={SRadius}
        />
      </>
    );
  }
);
