import React from 'react'
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc , getDoc, query,
  where, } from 'firebase/firestore';
  import  CoinCard  from '../../components/coinCard/CoinCard'
  import { db, auth } from "../../config/FirebaceConfig";




function Favourites(props) {

  useEffect(() => {
    props.getMyCrypto();
  }, [props.user]);



   const RemoveCryptoCoin = async (crypto) => {
    console.log(crypto.id);
    try {
      const q = query(
        props.CryptoCoinCollectionRef,
        where("id", "==", crypto.id),
        where("user", "==", props.user.uid)
      );

      const CryptoCoinDoc = await getDocs(q);

      console.log(CryptoCoinDoc);
      await deleteDoc(doc(db, "MyCrypto", CryptoCoinDoc.docs[0].id));

      const filtered = props.Cryptos.filter((item) => item.id !== crypto.id);

      props.setCryptos(filtered);

      // setAddedCoinIds((prevIds) => prevIds.filter((id) => id !== crypto.id));

      setCoins((prevCoins) =>
        prevCoins.map((item) =>
          item.id === crypto.id ? { ...item, isAdded: false } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(props.Cryptos);

  return (
    <div>
      <h1 className="h1 typing-text">Your favourites crypto list</h1>
      <div className='coinCardContainer' >

    {props.Cryptos.map((item, i) => {
      return (
        <CoinCard
          coin={item}
          RemoveCryptoCoin={RemoveCryptoCoin}
          key={`co_${i}`}
        />
      );
    })}
</div>
  </div>


  )
}

export default Favourites