import { eventNames } from "process";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text: string;
  active?: boolean;
}

// prop에 기본값 주는 방법: active = false
function Dummy({ text, active = false }: DummyProps) {
  return <h1>{text}</h1>;
}

// active는 active={true}와 같은 말
function App() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <Container>
      <Dummy active text="hello" />
      <button onClick={onClick}>click me</button>
    </Container>
  );
}

export default App;
