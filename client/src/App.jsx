import React, { useEffect, useGlobal } from 'reactn';
import axios from 'axios';
import WrappedNormalLoginForm from './components/LogIn';
import WrappedRegisterForm from './components/Register';

// firebase.initializeApp(firebaseConfig);

function App() {
  const [fire] = useGlobal('fire');
  const [token, setToken] = useGlobal('token');

  useEffect(() => {
    fire.auth().onAuthStateChanged(async function(firebaseUser) {
      if (firebaseUser) {
        setToken(firebaseUser._lat);
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
        if (token) setToken(null);
        // User is signed out.
        // ...
        // window.location.href = "/";
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
