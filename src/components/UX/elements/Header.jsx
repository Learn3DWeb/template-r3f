import React from "react";
import styled from "styled-components";
import { Logo } from "../../../assets/";

export function Header() {
  return (
    <HeaderStyle>
      <img src={Logo} className="logo" alt="Vite logo" />
      <h1>
        <a href="www.learn3Dweb.com" target="_blank">
          Learn<b>3D</b>Web
        </a>
      </h1>
      <h2>A New Dimension to the Web</h2>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  background-color: #333;
  padding: 1rem;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: min-content min-content;
  align-content: center;
  a {
    text-decoration: none;
    color: inherit;
  }
  > img {
    grid-row: 1 / -1;
    height: 3rem;
    padding-right: 1rem;
  }
  > h1 {
    display: flex;
    font-size: 1.5rem;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    b {
      font-weight: bold;
    }
  }
  > h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    color: #414141;
  }
`;