import React from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
  background-color: #333;
  padding: 1rem;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  text-align: right;
  > a {
    color: inherit;
    text-decoration: none;
  }
`;

export function Footer() {
  return (
    <FooterStyle>
      <a
        href="https://codesandbox.io/p/github/Learn3DWeb/template-r3f-basic/main"
        target="_blank"
      >
        Template: R3F-Basic
      </a>
    </FooterStyle>
  );
}
