import React, { useEffect, useGlobal } from 'reactn';
import WrappedNormalLoginForm from './components/LogIn';
import WrappedRegisterForm from './components/Register';
import { BrowserRouter as Router } from 'react-router-dom';
import { findOrCreate as findOrCreatePlayer } from './services/api/player';
import MainViews from './views/views.switch';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import TestMap from './components/Maps/TestMap';

import { requestNotificationPerm } from "./services/notifications";

function App() {
  const [fire] = useGlobal('fire');
  const [token, setToken] = useGlobal('token');
  const [player, setPlayer] = useGlobal('player');
  const [messageToken, setMessageToken] = useGlobal('playerMessagingToken');

  // Use effect for Auth State Change
  useEffect(() => {

    // Initialization for cloud messaging
    requestNotificationPerm(fire).then(retrievedToken => {
      setMessageToken(retrievedToken);
    });

    fire.auth().onAuthStateChanged(async function(firebaseUser) {
      if (firebaseUser) {
        setToken(firebaseUser._lat);
        const playerFetch = await findOrCreatePlayer(
          firebaseUser._lat,
          firebaseUser
        );
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
