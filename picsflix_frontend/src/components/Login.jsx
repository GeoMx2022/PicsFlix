import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import loginVideo from "../assets/loginVideo.mp4";
import logoWhite from "../assets/picsFlix_logo_white.png";
import { client } from "../client";

export default function Login() {
  const navigate = useNavigate();

  const getOrCreateUser = async (credentialResponse) => {
    const decodedData = jwt_decode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(decodedData));
    const { name, picture, sub } = decodedData;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    await client.createIfNotExists(doc);
    navigate('/', { replace: true })
  };

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
                getOrCreateUser(credentialResponse);
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


