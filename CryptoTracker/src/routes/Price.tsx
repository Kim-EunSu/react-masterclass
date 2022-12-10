import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Tabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
`;

const Tab = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgb(255 255 255 / 50%);
  padding: 30px;
  border-radius: 10px;
  span:first-child {
    font-size: 18px;
    font-weight: 600;
    color: white;
  }
  span:last-child {
    font-size: 20px;
    font-weight: 600;
  }
`;

const Price = () => {
  const coinId = useOutletContext();

  const { isLoading, data } = useQuery<PriceData>(
    ["ohlcv", coinId],
    () => fetchCoinTickers(`${coinId}`),
    {
      refetchInterval: 10000,
    }
  );

  const USD = data?.quotes.USD;

  return (
    <div>
      {isLoading ? (
        "Loading Price... "
      ) : (
        <div>
          <Tabs>
            <Tab>
              <span>price</span>
              <span>{USD?.price.toFixed(6)} USD</span>
            </Tab>
            <Tab>
              <span>Change rate in last 1 hours:</span>
              <span>{USD?.percent_change_1h.toFixed(5)} USD</span>
            </Tab>
            <Tab>
              <span>Change rate in last 6 hours:</span>
              <span>{USD?.percent_change_6h.toFixed(5)} USD</span>
            </Tab>
            <Tab>
              <span>Change rate in last 12 hours:</span>
              <span>{USD?.percent_change_12h.toFixed(5)} USD</span>
            </Tab>
            <Tab>
              <span>Change rate in last 24 hours:</span>
              <span>{USD?.percent_change_24h.toFixed(5)} USD</span>
            </Tab>
          </Tabs>
        </div>
      )}{" "}
    </div>
  );
};
export default Price;
