import React, { useGlobal } from "reactn";
import WrappedRegisterForm from "../components/Register";

const LoginView = props => {
  const [fire] = useGlobal("fire");
  const handleSignOut = () => {
    fire.auth().signOut();
    window.location.href = "/";
  };

  return (
    <div>
      <WrappedRegisterForm></WrappedRegisterForm>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default LoginView;
