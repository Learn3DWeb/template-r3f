import React from "react";
import styled from "styled-components";

import { Header, Footer } from "../";

const HUDStyle = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  height: -webkit-fill-available;
  grid-template-rows: min-content auto min-content;
  z-index: 10;
  pointer-events: none; // IMPORTANT!
`;

export function HUD() {
  return (
    <HUDStyle>
      <Header />
      <main></main>
      <Footer />
    </HUDStyle>
  );
}
