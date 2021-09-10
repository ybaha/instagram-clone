import React from "react";
import styled from "styled-components";

type ButtonProps = {
  type: "primary" | "secondary" | "tertiary";
  text?: string;
  icon?: any;
  style?: object;
};

const Button: React.FC<ButtonProps> = ({ type, text, icon, style }) => {
  return (
    <ButtonContainer style={style ? style : {}}>
      <ButtonInner t={type}>{icon ? icon : text}</ButtonInner>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div<{ style: object }>``;

const ButtonInner = styled.button<{ t: string }>`
  background-color: ${(p) => (p.t === "primary" ? "#0095f6" : "")};
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #dbdbdb;
  padding: 5px 9px;
  border-radius: 4px;
  font-size: 14px;
`;

export default Button;
