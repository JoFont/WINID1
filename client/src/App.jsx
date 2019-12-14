import React, { useEffect, useGlobal } from 'reactn';
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
  const [, setMessageToken] = useGlobal('playerMessagingToken');

  // Use effect for Firebase Magic
  useEffect(() => {
    // Initialization for cloud messaging
    requestNotificationPerm(fire).then(retrievedToken => {
      setMessageToken(retrievedToken);
    });

    // Authentication Event Listener
    fire.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setToken(firebaseUser._lat);
        const playerFetch = await findOrCreatePlayer(firebaseUser._lat, firebaseUser);
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
