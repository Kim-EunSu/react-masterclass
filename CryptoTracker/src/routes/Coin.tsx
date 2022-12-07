import styled from "styled-components";
import { useParams } from "react-router";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouterParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const [isLoading, setIsLoading] = useState(true);
  const { coinId } = useParams<"coinId">();
  // const { state } = useLocation() as RouteState;
  const location = useLocation();
  const state = location.state as RouteState;

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
      </Header>
      {isLoading ? <Loader> Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
