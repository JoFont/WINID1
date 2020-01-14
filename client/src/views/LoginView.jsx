import React from "react";
import WrappedLoginForm from "../components/LogIn";

const LoginView = () => {
  return (
    <div className="w-full h-screen min-h-full winid-gradient-90 flex flex-col items-center justify-center">
      <h1 className="mb-1 text-2xl text-white font-winid1 uppercase">
        <span className="text-indigo-900">Winid</span>U to Login
      </h1>
      <div className="w-full sm:w-1/2 md:w-1/3 bg-white p-6 rounded shadow">
        <WrappedLoginForm></WrappedLoginForm>
      </div>
    </div>
  );
};

export default LoginView;
