import React, { useEffect, useState } from 'react'
import './CoinCard.css'
import {Link} from "react-router-dom"

function CoinCard(props) {
  const [isCryptoAdded, setisCryptoAdded] = useState(false);

  useEffect(() => {
    setisCryptoAdded(props.coin.isAdded);
  }, [props]);
  // console.log();
  console.log(props.coin);
  return (
    <>

    <div className='coinCard'>
      <h1 className='coinName'>{props.coin.name}</h1>
      <p>{props.coin.priceUsd} <span className='dollar'>$</span></p>
      <p> {props.coin.rank}# Rank</p>
      <p>Symbol: {props.coin.symbol}</p>
      <p>Change Percent 24 hours: <br /> {props.coin.changePercent24Hr} %</p>
      <div className='btnBox'>
      <button className='btn'
        onClick={() =>
          isCryptoAdded
            ? props.RemoveCryptoCoin(props.coin)
            : props.submitHandler(props.coin)
        }
      >
        {isCryptoAdded ? "Remove" : "Add Coin"}
      </button >
      <Link className='btn' to={`/coins/${props.coin.id}`}> Go to </Link>
    </div>
    
    </div>



</>
  )
}

export default CoinCard;