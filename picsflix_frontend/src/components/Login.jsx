import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import loginVideo from "../assets/loginVideo.mp4";
import logoWhite from "../assets/picsFlix_logo_white.png";

const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="relative h-full w-full">
        <video
          src={loginVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="h-full w-full object-cover"
        />

        <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center bg-blackOverlay">
          <div className="p-5">
            <img src={logoWhite} width="130px" alt="logoWhite" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
