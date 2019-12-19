import React, { useGlobal } from "reactn";
import WrappedRegisterForm from "../components/Register";

const LoginView = props => {
  const [fire] = useGlobal("fire");
  const handleSignOut = () => {
    fire.auth().signOut();
  };

  return (
    <div>
      <WrappedRegisterForm></WrappedRegisterForm>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default LoginView;
