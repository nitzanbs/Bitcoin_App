import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import '../Navbar/Navbar.css'
import { getAuth, signOut } from 'firebase/auth';
import { ThemeContext } from '../../context/ThemeProvider';



function NavBar({ user }) {
  const auth = getAuth();
  const {isDarkMode, toggleTheme, selectedTheme} = useContext(ThemeContext);


  return (
    <nav className='navbar'>
      <div>
        <p className='cryptoVortex'>Crypto Vortex</p>
      </div>

      <div>
        <Link className='pNav' to="/Home">Home</Link>
      </div>

      <div>
        {user ? (
          <Link className='pNav' to="/Favourites">Favourites</Link>
        ) : (
          <Link className='pNav' to="/Auth">Auth</Link>
        )}
      </div>
      <div>
        <button onClick={toggleTheme}>mode</button>
      </div>



      {user ? (
          <div className="DivForSignOutBtn">
            <button onClick={() => signOut(auth)} className="SignOutBtn">
              Sign Out
            </button>
            
            <p className='pNavUser'>Hello <br /> {user.email}</p>
        </div>
      ) : null}

    </nav>
  )
}

export default NavBar