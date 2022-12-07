import { useParams } from "react-router";

interface RouterParams {
  [key: string]: string | undefined;
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<RouterParams>();

  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
