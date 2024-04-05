import styled from "styled-components";

import { HUD } from "./components/UX/";
import { Scene3D } from "./components/3D";

export function App() {
  return (
    <AppStyle>
      <Scene3D />
      <HUD />
    </AppStyle>
  );
}

const AppStyle = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  height: -webkit-fill-available;
  grid-template-rows: auto;
  > * {
    grid-row: 1;
    grid-column: 1;
  }
`;