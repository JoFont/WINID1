import React, { useEffect, useGlobal } from 'reactn';

import WrappedNormalLoginForm from './components/LogIn';


// firebase.initializeApp(firebaseConfig);

function App() {
  const [fire] = useGlobal("fire");
  const [player, setPlayer] = useGlobal("player");

  useEffect(() => {
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        setPlayer(user);
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }, []);

  return (
    <div className="mt-24">
      <WrappedNormalLoginForm/>
    </div>
  );
}

export default App;
