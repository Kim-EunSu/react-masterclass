import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string;
}

// Circle Proops의 타입이 무엇인지 컴포넌트에게 알려줌
function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;

// interface PlayerShape {
//   name: string;
//   age: string;
// }

// const sayHello = (playerObj: PlayerShape) =>
//   `Hello ${playerObj.name} you are ${playerObj.age} years old`;
