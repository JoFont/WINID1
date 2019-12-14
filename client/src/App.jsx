import React, { useEffect, useGlobal } from 'reactn';
import WrappedNormalLoginForm from './components/LogIn';
import WrappedRegisterForm from './components/Register';
import { BrowserRouter as Router } from 'react-router-dom';
import { findOrCreate as findOrCreatePlayer } from './services/api/player';
import MainViews from './views/views.switch';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import TestMap from './components/Maps/TestMap';

function App() {
  const [fire] = useGlobal('fire');
  const [token, setToken] = useGlobal('token');
  const [player, setPlayer] = useGlobal('player');

  // Use effect for Auth State Change
  useEffect(() => {
    fire.auth().onAuthStateChanged(async function(firebaseUser) {
      if (firebaseUser) {
        // console.log(firebaseUser);
        setToken(firebaseUser._lat);
        const playerFetch = await findOrCreatePlayer(
          firebaseUser._lat,
          firebaseUser
        );
        // console.log('PLAYERFETCH', playerFetch);
        if (playerFetch && player === null) {
          setPlayer(playerFetch.data);
        }
      } else {
        if (token) setToken(null);
      }
    });
  }, []);

  const handleSignOut = e => {
    e.preventDefault();
    fire.auth().signOut();
  };

  return (
    <Router>
      <div className="bg-gray-200">
        <Navbar></Navbar>
        <GameCard></GameCard>
        <TestMap></TestMap>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <MainViews />
    </Router>
  );
}

export default App;
