import React, { useGlobal } from "reactn";
import WrappedRegisterForm from "../components/Register";

const LoginView = props => {
  const [fire] = useGlobal("fire");
  const handleSignOut = () => {
    fire.auth().signOut();
    window.location.href = "/";
  };

  return (
    <div className="w-full h-screen min-h-full winid-gradient-90 flex flex-col items-center justify-center">
      <h1 className="mb-1 text-2xl text-white font-winid1 uppercase">
        <span className="text-gray-400">Winid</span>U to Register
      </h1>
      <div className="w-full sm:w-1/2 md:w-1/3 bg-white p-6 rounded shadow">
        <WrappedRegisterForm></WrappedRegisterForm>
        {/* <button onClick={handleSignOut}>Sign Out</button> */}
      </div>
    </div>
  );
};

export default LoginView;
