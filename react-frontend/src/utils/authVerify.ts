import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token: any) => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props: any) => {
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token")!);

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);
};

export default AuthVerify;