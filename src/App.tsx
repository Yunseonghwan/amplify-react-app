import { API } from "aws-amplify";
import { useEffect, useState } from "react";

interface ICoins {
  name: string;
  symbol: string;
  price_usd: string;
}

function App() {
  const [input, setInput] = useState({ limit: 5, start: 0 });
  const [coins, setCoins] = useState<ICoins[]>([]);

  const updateInputValues = (type: string, value: string) => {
    setInput({ ...input, [type]: value });
  };

  const fetchCoins = async () => {
    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`,
      {}
    );
    setCoins(data.coins);
  };

  return (
    <>
      {coins.map((coin, idx) => (
        <div key={idx}>
          <h2>
            {coin.name} - {coin.symbol}
            <h5>${coin.price_usd}</h5>
          </h2>
        </div>
      ))}
      <input
        placeholder="limit"
        onChange={(e) => updateInputValues("limit", e.target.value)}
      />
      <input
        placeholder="start"
        onChange={(e) => updateInputValues("start", e.target.value)}
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
    </>
  );
}

export default App;
