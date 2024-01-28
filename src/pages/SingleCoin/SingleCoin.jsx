import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './SingleCoin.css'

function SingleCoin() {
  // const params = useParams();
  // console.log(params);
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  console.log({ coinId });
  const getCoin = async () => {
    try {
      const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`);
      const data = await res.json();
      console.log(data);
      setCoin(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoin();
  }, []);

  return (
    <div>
      <div className="coinCardSingle">
      <h1 className='coinNameSingle'>{coin?.name}</h1>
      <p>{coin.priceUsd}  <span className='dollarSingle'> $</span></p>
      <p> {coin.rank}# Rank</p>
      <p><span className="spanSingle">Symbol:</span> {coin.symbol}</p>
      <p><span className="spanSingle">Change Percent 24 hours:</span> {coin.changePercent24Hr} %</p>
      <p><span className="spanSingle">market Cap:</span> {coin.marketCapUsd}<span className='dollarSingle'> $</span></p>
      <p><span className="spanSingle">supply:</span> {coin.supply}</p>
      <p><span className="spanSingle">max Supply:</span> {coin.maxSupply}</p>
      <p><span className="spanSingle">vwap 24Hr:</span> {coin.vwap24Hr}</p>
      </div>
    
    </div>
  );
}

export default SingleCoin;