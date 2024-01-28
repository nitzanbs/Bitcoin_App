import { useState, useEffect , useContext } from 'react'
import { getDocs, collection, query, where } from "firebase/firestore";
import './App.css'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Favourites from './pages/favourites/Favourites'
import NavBar from './components/navbar/NavBar'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { db, auth } from './config/FirebaceConfig'
import { onAuthStateChanged } from 'firebase/auth';
import  SingleCoin  from './pages/SingleCoin/SingleCoin'
import  NotFound  from './components/NotFound'
import { ThemeContext } from './context/ThemeProvider'



function App() {
  const {isDarkMode, toggleTheme, selectedTheme} = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [Cryptos, setCryptos] = useState([]);

  const CryptoCoinCollectionRef = collection(db, "MyCrypto");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const getMyCrypto = async () => {
    try {
      if (!user) {
        return;
      }
      const q = query(CryptoCoinCollectionRef, where("user", "==", user.uid));
      const rowDocs = await getDocs(q);
      const docs = rowDocs.docs.map((doc) => {
        return { ...doc.data(), uid: doc.id };
      });
      setCryptos(docs);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(user);

  return (
    <div style={{...selectedTheme}}>
    <BrowserRouter>
      <NavBar user={user} />
      {user ? (
        <Routes>
          <Route
            path="/Home"
            element={
              <Home
                setCryptos={setCryptos}
                Cryptos={Cryptos}
                getMyCrypto={getMyCrypto}
                user={user}
                CryptoCoinCollectionRef={CryptoCoinCollectionRef}
              />
            }
          />

          <Route path="/coins/:coinId" element={<SingleCoin />} />
          <Route
            path="/Favourites"
            element={
              <Favourites
                setCryptos={setCryptos}
                Cryptos={Cryptos}
                getMyCrypto={getMyCrypto}
                user={user}
                CryptoCoinCollectionRef={CryptoCoinCollectionRef}
              />
            }
          />
          <Route
            path="/Auth"
            element={
              <Auth
                CryptoCoinCollectionRef={CryptoCoinCollectionRef}
                setCryptos={setCryptos}
                Cryptos={Cryptos}
                setUser={setUser}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/Home"
            element={
              <Home
                setCryptos={setCryptos}
                Cryptos={Cryptos}
                getMyCrypto={getMyCrypto}
                user={user}
                CryptoCoinCollectionRef={CryptoCoinCollectionRef}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                setCryptos={setCryptos}
                Cryptos={Cryptos}
                getMyCrypto={getMyCrypto}
                user={user}
                CryptoCoinCollectionRef={CryptoCoinCollectionRef}
              />
            }
          />
          <Route
            path="/Auth"
            element={
              <Auth
                CryptoCoinCollectionRef={CryptoCoinCollectionRef}
                setCryptos={setCryptos}
                Cryptos={Cryptos}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/Favourites"
            element={
              <Favourites
                setCryptos={setCryptos}
                Cryptos={Cryptos}
                getMyCrypto={getMyCrypto}
                user={user}
                CryptoCoinCollectionRef={CryptoCoinCollectionRef}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
    </div>
  );
}

export default App;