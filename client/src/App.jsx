import React, { useEffect, useGlobal } from 'reactn';
import WrappedNormalLoginForm from './components/LogIn';
import WrappedRegisterForm from './components/Register';
import { findOrCreate as findOrCreatePlayer } from "./services/api/player";
 
// firebase.initializeApp(firebaseConfig);

function App() {
  const [fire] = useGlobal('fire');
  const [token, setToken] = useGlobal('token');
  const [player, setPlayer] = useGlobal('player');

  useEffect(() => {
    fire.auth().onAuthStateChanged(async function(firebaseUser) {
      if (firebaseUser) {
        console.log(firebaseUser);
        setToken(firebaseUser._lat);
        const playerFetch = await findOrCreatePlayer(token, firebaseUser);
        if(playerFetch && player === null) {
          setPlayer(playerFetch);
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
    <div className="mt-24">
      <WrappedNormalLoginForm />
      {/* <WrappedRegisterForm /> */}

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;
